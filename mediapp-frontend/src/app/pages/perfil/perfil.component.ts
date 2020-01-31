import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: string[];
  roles: string;
  constructor() { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos(){
    const helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));    
    this.usuario=decodedToken.user_name;
    this.roles=decodedToken.authorities;
  } 
}
