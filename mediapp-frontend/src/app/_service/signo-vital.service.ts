import { Injectable } from '@angular/core';
import { SignoVital } from '../_model/signoVital';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignoVitalService {
  signoCambio = new Subject<SignoVital[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/signos`;
  constructor(private http: HttpClient) {
  }
  listar() {
    return this.http.get<SignoVital[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  listarPorId(idSigno: number) {
    return this.http.get<SignoVital>(`${this.url}/${idSigno}`);
  }

  registrar(signo: SignoVital) {
    return this.http.post(this.url, signo);
  }

  modificar(signo: SignoVital) {
    return this.http.put(this.url, signo);
  }

  eliminar(idSigno: number) {
    return this.http.delete(`${this.url}/${idSigno}`);
  }
}
