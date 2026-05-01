import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../navbar/navbar';
import { Usuario as UsuarioServicio } from '../../Servicios/usuario';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit {
  listaUsuarios: any[] = [];
  mensajeError: string = '';
  mensajeExito: string = '';

  editandoId: number | null = null;

  usuarioEditar = {
    username: '',
    password: '',
    rol: ''
  };

  constructor(private usuarioService: UsuarioServicio) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los usuarios.';
      }
    });
  }

  editar(usuario: any): void {
    this.editandoId = usuario.id;
    this.usuarioEditar = {
      username: usuario.username,
      password: usuario.password,
      rol: usuario.rol
    };
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.usuarioEditar = {
      username: '',
      password: '',
      rol: ''
    };
  }

  guardarEdicion(id: number): void {
    this.usuarioService.actualizar(id, this.usuarioEditar).subscribe({
      next: () => {
        this.mensajeExito = 'Usuario actualizado correctamente.';
        this.cancelarEdicion();
        this.cargarUsuarios();
      },
      error: () => {
        this.mensajeError = 'No se pudo actualizar el usuario.';
      }
    });
  }

  eliminar(id: number): void {
    this.usuarioService.eliminar(id).subscribe({
      next: () => {
        this.mensajeExito = 'Usuario eliminado correctamente.';
        this.cargarUsuarios();
      },
      error: () => {
        this.mensajeError = 'No se pudo eliminar el usuario.';
      }
    });
  }
}