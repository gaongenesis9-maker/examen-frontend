import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Servicio as ServicioModelo } from '../Entidades/servicio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Servicio {

  private apiUrl = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ServicioModelo[]> {
    return this.http.get<ServicioModelo[]>(this.apiUrl);
  }

  guardar(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(this.apiUrl, servicio);
  }
}