import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';  
import { Medico as MedicoModelo } from '../../Entidades/medico';
import { Medico as MedicoServicio } from '../../Servicios/medico';

@Component({
  selector: 'app-medico',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './medico.html',
  styleUrl: './medico.css',
})
export class Medico implements OnInit {

  listaMedicos: MedicoModelo[] = [];

  nuevoMedico: MedicoModelo = {
    nombre: '',
    especialidad: ''
  };

  constructor(private medicoService: MedicoServicio) {}

  ngOnInit(): void {
    this.cargarMedicos();
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

  guardarMedico(): void {
    this.medicoService.guardar(this.nuevoMedico).subscribe({
      next: () => {
        this.nuevoMedico = {
          nombre: '',
          especialidad: ''
        };
        this.cargarMedicos();
      },
      error: (error) => {
        console.error('Error al guardar médico', error);
      }
    });
  }
}