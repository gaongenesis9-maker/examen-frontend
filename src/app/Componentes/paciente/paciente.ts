import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../navbar/navbar';
import { Paciente as PacienteModelo } from '../../Entidades/paciente';
import { Paciente as PacienteServicio } from '../../Servicios/paciente';

@Component({
  selector: 'app-paciente',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css',
})
export class Paciente implements OnInit {

  listaPacientes: PacienteModelo[] = [];

  nuevoPaciente: PacienteModelo = {
    nombre: '',
    apellido: '',
    email: ''
  };

  constructor(private pacienteService: PacienteServicio) {}

  ngOnInit(): void {
    this.cargarPacientes();
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

  guardarPaciente(): void {
    this.pacienteService.guardar(this.nuevoPaciente).subscribe({
      next: () => {
        this.nuevoPaciente = {
          nombre: '',
          apellido: '',
          email: ''
        };
        this.cargarPacientes();
      },
      error: (error) => {
        console.error('Error al guardar paciente', error);
      }
    });
  }
}