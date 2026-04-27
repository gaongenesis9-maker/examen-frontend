import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from '../Entidades/login';
import { Usuario } from '../Entidades/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(datos: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  guardarRol(rol: string): void {
    localStorage.setItem('rol', rol);
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  estaLogueado(): boolean {
    return this.obtenerToken() !== null;
  }
}