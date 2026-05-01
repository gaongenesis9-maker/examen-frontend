import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Auth } from '../../Servicios/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
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
    if (!this.username.trim() || !this.password.trim()) {
      this.mensajeError = 'Debe completar usuario y contraseña.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (respuesta) => {
        localStorage.setItem('rol', respuesta.rol);
        this.mensajeError = '';

        const rol = (respuesta.rol || '').toUpperCase();

        if (rol === 'ADMIN') {
          this.router.navigate(['/usuarios']);
        } else if (rol === 'MEDICO' || rol === 'PACIENTE') {
          this.router.navigate(['/consultas']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}