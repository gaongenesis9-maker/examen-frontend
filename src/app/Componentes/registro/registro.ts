import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Auth } from '../../Servicios/auth';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  username: string = '';
  password: string = '';
  rol: string = 'PACIENTE';
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
      this.mensajeError = 'Debe completar usuario y contraseña.';
      return;
    }

    const datos = {
      username: this.username,
      password: this.password,
      rol: this.rol
    };

    this.authService.registrar(datos).subscribe({
      next: () => {
        this.mensajeExito = 'Cuenta creada correctamente.';
        this.username = '';
        this.password = '';
        this.rol = 'PACIENTE';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: () => {
        this.mensajeError = 'No se pudo crear la cuenta.';
      }
    });
  }
}