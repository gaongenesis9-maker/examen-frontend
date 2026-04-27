import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  rol: string = '';

  constructor(private router: Router) {
    this.rol = (localStorage.getItem('rol') || '').toUpperCase();
  }

  esAdmin(): boolean {
    return this.rol === 'ADMIN';
  }

  esMedico(): boolean {
    return this.rol === 'MEDICO';
  }

  esPaciente(): boolean {
    return this.rol === 'PACIENTE';
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}