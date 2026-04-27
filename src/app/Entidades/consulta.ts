import { Paciente } from './paciente';
import { Medico } from './medico';
import { Servicio } from './servicio';

export interface Consulta {
  id?: number;
  fecha: string;
  motivo: string;
  paciente: Paciente;
  medico: Medico;
  servicios: Servicio[];
}