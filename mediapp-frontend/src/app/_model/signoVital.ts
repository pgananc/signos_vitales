import { Paciente } from './paciente';

export class SignoVital {
    idSigno: number;
    paciente: Paciente;
    fecha: string;
    temperatura: string;
    pulso: string;
    ritmoRespiratorio: string;
}