import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Auth } from '../../Servicios/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
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
    const datos = {
      username: this.username,
      password: this.password
    };

    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        this.authService.guardarToken(respuesta.token);
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