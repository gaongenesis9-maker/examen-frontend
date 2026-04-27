import { Routes } from '@angular/router';
import { Inicio } from './Componentes/inicio/inicio';
import { Login } from './Componentes/login/login';
import { Registro } from './Componentes/registro/registro';
import { Usuario } from './Componentes/usuario/usuario';
import { Paciente } from './Componentes/paciente/paciente';
import { Medico } from './Componentes/medico/medico';
import { Servicio } from './Componentes/servicio/servicio';
import { Consulta } from './Componentes/consulta/consulta';
import { rolGuard } from './Servicios/rol-guard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  { path: 'usuarios', component: Usuario, canActivate: [rolGuard] },
  { path: 'pacientes', component: Paciente, canActivate: [rolGuard] },
  { path: 'medicos', component: Medico, canActivate: [rolGuard] },
  { path: 'servicios', component: Servicio, canActivate: [rolGuard] },
  { path: 'consultas', component: Consulta, canActivate: [rolGuard] }
];