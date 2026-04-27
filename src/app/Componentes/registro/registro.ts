import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Auth } from '../../Servicios/auth';
import { Usuario } from '../../Entidades/usuario';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  username: string = '';
  password: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  registrar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.mensajeError = 'Debe completar todos los campos.';
      return;
    }

    const usuario: Usuario = {
      username: this.username,
      password: this.password
    };

    this.authService.registrar(usuario).subscribe({
      next: () => {
        this.mensajeExito = 'Cuenta creada correctamente. Ahora puede iniciar sesión.';
        this.username = '';
        this.password = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: () => {
        this.mensajeError = 'No se pudo crear la cuenta.';
      }
    });
  }
}