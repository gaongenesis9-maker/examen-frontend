import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Medico as MedicoModelo } from '../Entidades/medico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Medico {

  private apiUrl = `${environment.apiUrl}/medicos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<MedicoModelo[]> {
    return this.http.get<MedicoModelo[]>(this.apiUrl);
  }

  guardar(medico: MedicoModelo): Observable<MedicoModelo> {
    return this.http.post<MedicoModelo>(this.apiUrl, medico);
  }
}