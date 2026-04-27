import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../navbar/navbar';
import { Consulta as ConsultaModelo } from '../../Entidades/consulta';
import { Paciente as PacienteModelo } from '../../Entidades/paciente';
import { Medico as MedicoModelo } from '../../Entidades/medico';
import { Servicio as ServicioModelo } from '../../Entidades/servicio';

import { Consulta as ConsultaServicio } from '../../Servicios/consulta';
import { Paciente as PacienteServicio } from '../../Servicios/paciente';
import { Medico as MedicoServicio } from '../../Servicios/medico';
import { Servicio as ServicioService } from '../../Servicios/servicio';

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta implements OnInit {

  rol: string = (localStorage.getItem('rol') || '').toUpperCase();

  listaConsultas: ConsultaModelo[] = [];
  listaPacientes: PacienteModelo[] = [];
  listaMedicos: MedicoModelo[] = [];
  listaServicios: ServicioModelo[] = [];

  mensajeError: string = '';
  mensajeExito: string = '';

  nuevaConsulta = {
    fecha: '',
    motivo: '',
    pacienteId: null as number | null,
    medicoId: null as number | null,
    serviciosIds: [] as number[]
  };

  constructor(
    private consultaService: ConsultaServicio,
    private pacienteService: PacienteServicio,
    private medicoService: MedicoServicio,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.cargarConsultas();
    this.cargarMedicos();
    this.cargarServicios();

    if (this.esAdmin()) {
      this.cargarPacientes();
    }
  }

  esAdmin(): boolean {
    return this.rol === 'ADMIN';
  }

  esPaciente(): boolean {
    return this.rol === 'PACIENTE';
  }

  esMedico(): boolean {
    return this.rol === 'MEDICO';
  }

  cargarConsultas(): void {
    if (this.esAdmin()) {
      this.consultaService.listar().subscribe({
        next: (data) => {
          this.listaConsultas = data;
        },
        error: (error) => {
          console.error('Error al listar consultas', error);
        }
      });
      return;
    }

    this.consultaService.listarMisConsultas().subscribe({
      next: (data) => {
        this.listaConsultas = data;
      },
      error: (error) => {
        console.error('Error al listar mis consultas', error);
      }
    });
  }

  cargarPacientes(): void {
    this.pacienteService.listar().subscribe({
      next: (data) => {
        this.listaPacientes = data;
      },
      error: (error) => {
        console.error('Error al listar pacientes', error);
      }
    });
  }

  cargarMedicos(): void {
    this.medicoService.listar().subscribe({
      next: (data) => {
        this.listaMedicos = data;
      },
      error: (error) => {
        console.error('Error al listar médicos', error);
      }
    });
  }

  cargarServicios(): void {
    this.servicioService.listar().subscribe({
      next: (data) => {
        this.listaServicios = data;
      },
      error: (error) => {
        console.error('Error al listar servicios', error);
      }
    });
  }

  estaSeleccionado(id: number): boolean {
    return this.nuevaConsulta.serviciosIds.includes(id);
  }

  toggleServicio(id: number): void {
    if (this.nuevaConsulta.serviciosIds.includes(id)) {
      this.nuevaConsulta.serviciosIds = this.nuevaConsulta.serviciosIds.filter(s => s !== id);
    } else {
      this.nuevaConsulta.serviciosIds.push(id);
    }
  }

  guardarConsulta(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.esMedico()) {
      this.mensajeError = 'El médico no puede registrar consultas.';
      return;
    }

    if (!this.nuevaConsulta.fecha || !this.nuevaConsulta.motivo.trim()) {
      this.mensajeError = 'Debe ingresar la fecha y el motivo.';
      return;
    }

    if (this.nuevaConsulta.medicoId === null) {
      this.mensajeError = 'Debe seleccionar un médico.';
      return;
    }

    if (this.nuevaConsulta.serviciosIds.length === 0) {
      this.mensajeError = 'Debe seleccionar al menos un servicio.';
      return;
    }

    const medicoSeleccionado = this.listaMedicos.find(
      m => m.id === this.nuevaConsulta.medicoId
    );

    const serviciosSeleccionados = this.listaServicios.filter(
      s => s.id !== undefined && this.nuevaConsulta.serviciosIds.includes(s.id)
    );

    if (!medicoSeleccionado || serviciosSeleccionados.length === 0) {
      this.mensajeError = 'No se pudieron resolver los datos seleccionados.';
      return;
    }

    const consultaEnviar: any = {
      fecha: this.nuevaConsulta.fecha,
      motivo: this.nuevaConsulta.motivo,
      medico: medicoSeleccionado,
      servicios: serviciosSeleccionados
    };

    if (this.esAdmin()) {
      if (this.nuevaConsulta.pacienteId === null) {
        this.mensajeError = 'Debe seleccionar un paciente.';
        return;
      }

      const pacienteSeleccionado = this.listaPacientes.find(
        p => p.id === this.nuevaConsulta.pacienteId
      );

      if (!pacienteSeleccionado) {
        this.mensajeError = 'No se encontró el paciente seleccionado.';
        return;
      }

      consultaEnviar.paciente = pacienteSeleccionado;

      this.consultaService.guardar(consultaEnviar).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.mensajeExito = 'Consulta registrada correctamente.';
          this.cargarConsultas();
        },
        error: (error) => {
          console.error('Error al guardar consulta', error);
          this.mensajeError = 'No se pudo guardar la consulta.';
        }
      });

      return;
    }

    if (this.esPaciente()) {
      this.consultaService.guardarMiConsulta(consultaEnviar).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.mensajeExito = 'Consulta agendada correctamente.';
          this.cargarConsultas();
        },
        error: (error) => {
          console.error('Error al guardar mi consulta', error);
          this.mensajeError = 'No se pudo agendar la consulta.';
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.nuevaConsulta = {
      fecha: '',
      motivo: '',
      pacienteId: null,
      medicoId: null,
      serviciosIds: []
    };
  }
}