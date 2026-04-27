import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Consulta as ConsultaModelo } from '../Entidades/consulta';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Consulta {

  private apiUrl = `${environment.apiUrl}/consultas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ConsultaModelo[]> {
    return this.http.get<ConsultaModelo[]>(this.apiUrl);
  }

  listarMisConsultas(): Observable<ConsultaModelo[]> {
    return this.http.get<ConsultaModelo[]>(`${this.apiUrl}/mis-consultas`);
  }

  guardar(datos: any): Observable<ConsultaModelo> {
    return this.http.post<ConsultaModelo>(this.apiUrl, datos);
  }

  guardarMiConsulta(datos: any): Observable<ConsultaModelo> {
    return this.http.post<ConsultaModelo>(`${this.apiUrl}/mis-consultas`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}