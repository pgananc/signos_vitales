import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SignoVital } from 'src/app/_model/signoVital';
import { SignoVitalService } from 'src/app/_service/signo-vital.service';

@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {
  cantidad: number = 0;
  dataSource: MatTableDataSource<SignoVital>;
  displayedColumns = ['idSigno', 'paciente', 'fecha', 'temperatura', 'pulso',  'ritmoRespiratorio', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private signoService : SignoVitalService, private snack : MatSnackBar) { }

  ngOnInit(
  ) {
    this.signoService.signoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });
    this.signoService.listarPageable(0, 10).subscribe(data => {
      //console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
}
filtrar(valor: string) {
  this.dataSource.filter = valor.trim().toLowerCase();
}

eliminar(idPaciente: number) {
  this.signoService.eliminar(idPaciente).subscribe(() => {
    this.signoService.listar().subscribe(data => {
      this.signoService.signoCambio.next(data);
      this.signoService.mensajeCambio.next('SE ELIMINO');

    });
  });
}

mostrarMas(e: any){
  this.signoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
    console.log(data);
    this.cantidad = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  });
}
}
