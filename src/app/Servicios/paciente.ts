import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paciente as PacienteModelo } from '../Entidades/paciente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Paciente {

  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<PacienteModelo[]> {
    return this.http.get<PacienteModelo[]>(this.apiUrl);
  }

  guardar(paciente: PacienteModelo): Observable<PacienteModelo> {
    return this.http.post<PacienteModelo>(this.apiUrl, paciente);
  }
}