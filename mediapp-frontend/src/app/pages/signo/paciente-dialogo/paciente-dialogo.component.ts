import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-dialogo',
  templateUrl: './paciente-dialogo.component.html',
  styleUrls: ['./paciente-dialogo.component.css']
})
export class PacienteDialogoComponent implements OnInit {

  paciente: Paciente;
  constructor(
    private dialogRef: MatDialogRef<PacienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Paciente,
    private pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.paciente = new Paciente();
    this.paciente.idPaciente = this.data.idPaciente;
    this.paciente.nombres = this.data.nombres;
    this.paciente.apellidos = this.data.apellidos;
    this.paciente.email = this.data.email;
    this.paciente.telefono = this.data.telefono;
    this.paciente.dni = this.data.dni;
  }

  operar() {
    if (this.paciente != null && this.paciente.idPaciente > 0) {
      //MODIFICAR
      //BUEN PRACTICA
      this.pacienteService.modificar(this.paciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //REGISTRAR
      //PRACTICA COMUN
      this.pacienteService.registrar(this.paciente).subscribe(data => {
        console.log(data);
        this.dialogRef.close(data);
      });
    }


  }

  cancelar() {
    this.dialogRef.close();
  }
}
