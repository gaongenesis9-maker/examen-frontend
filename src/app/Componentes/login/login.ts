import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../Servicios/auth';
import { Login as LoginRequest } from '../../Entidades/login';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  iniciarSesion(): void {
    const datos: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        this.authService.guardarToken(respuesta.token);
        this.authService.guardarRol(respuesta.rol);
        this.mensajeError = '';

        if (respuesta.rol === 'ADMIN') {
          this.router.navigate(['/pacientes']);
        } else if (respuesta.rol === 'MEDICO') {
          this.router.navigate(['/consultas']);
        } else if (respuesta.rol === 'PACIENTE') {
          this.router.navigate(['/pacientes']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}