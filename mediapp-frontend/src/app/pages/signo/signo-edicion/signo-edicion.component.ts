import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SignoVitalService } from 'src/app/_service/signo-vital.service';
import { SignoVital } from 'src/app/_model/signoVital';
import { Paciente } from 'src/app/_model/paciente';
import { Observable } from 'rxjs';
import { PacienteService } from 'src/app/_service/paciente.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PacienteDialogoComponent } from '../paciente-dialogo/paciente-dialogo.component';

@Component({
  selector: 'app-signo-edicion',
  templateUrl: './signo-edicion.component.html',
  styleUrls: ['./signo-edicion.component.css']
})
export class SignoEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;
  myControlPaciente: FormControl = new FormControl();
  pacientes: Paciente[] = [];
  pacienteSeleccionado: Paciente;
  pacientesFiltrados: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signoService: SignoVitalService,
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'fecha': new FormControl('', [Validators.required]),
      'pulso': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'ritmoRespiratorio': new FormControl(''),
      'temperatura': new FormControl(''),
      'paciente': this.myControlPaciente
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
    this.listarPacientes();
    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));

  }
  initForm() {

    if (this.edicion) {
      this.signoService.listarPorId(this.id).subscribe(data => {
        //  console.log(data);
        this.form = new FormGroup({
          'id': new FormControl(data.idSigno),
          'fecha': new FormControl(data.fecha),
          'pulso': new FormControl(data.pulso),
          'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio),
          'temperatura': new FormControl(data.temperatura),
          'paciente': new FormControl(data.paciente)
        });
        this.pacienteSeleccionado = data.paciente;
      });
      this.mostrarPaciente(this.pacienteSeleccionado);
    }
  }
  get f() { return this.form.controls; }

  operar() {

    //TE ASEGURAS QUE EL FORM ESTE VALIDO PARA PROSEGUIR
    if (this.form.invalid) {
      return;
    }

    let signo = new SignoVital();
    signo.idSigno = this.form.value['id'];
    var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    signo.fecha = localISOTime;
    //signo.fecha = this.form.value['fecha'];
    signo.pulso = this.form.value['pulso'];
    signo.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];
    signo.temperatura = this.form.value['temperatura'];
    signo.paciente = this.form.value['paciente'];

    if (this.edicion) {
      //servicio de edicion
      this.signoService.modificar(signo).subscribe(() => {
        this.signoService.listar().subscribe(data => {
          this.signoService.signoCambio.next(data);
          this.signoService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      //servicio de registro
      this.signoService.registrar(signo).subscribe(() => {
        this.signoService.listar().subscribe(data => {
          this.signoService.signoCambio.next(data);
          this.signoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['signo']);
  }

  mostrarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }
  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }
  filtrarPacientes(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }
  abrirDialogo(paciente?: Paciente) {
    let pac = paciente != null ? paciente : new Paciente();

    const dialogRef = this.dialog.open(PacienteDialogoComponent, {
      width: '250px',
      data: pac
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pacienteSeleccionado = result;
      console.log(this.form.value);
      this.form.patchValue({ paciente: this.pacienteSeleccionado });
      console.log(this.form.value);
      this.mostrarPaciente(this.pacienteSeleccionado);
    });
  }
}
