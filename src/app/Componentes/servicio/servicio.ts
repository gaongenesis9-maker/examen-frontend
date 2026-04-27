import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Servicio as ServicioModelo } from '../../Entidades/servicio';
import { Servicio as ServicioServicio } from '../../Servicios/servicio';

@Component({
  selector: 'app-servicio',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './servicio.html',
  styleUrl: './servicio.css',
})
export class Servicio implements OnInit {

  listaServicios: ServicioModelo[] = [];

  nuevoServicio: ServicioModelo = {
    nombre: '',
    descripcion: '',
    costo: 0
  };

  constructor(private servicioService: ServicioServicio) {}

  ngOnInit(): void {
    this.cargarServicios();
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

  guardarServicio(): void {
    this.servicioService.guardar(this.nuevoServicio).subscribe({
      next: () => {
        this.nuevoServicio = {
          nombre: '',
          descripcion: '',
          costo: 0
        };
        this.cargarServicios();
      },
      error: (error) => {
        console.error('Error al guardar servicio', error);
      }
    });
  }
}