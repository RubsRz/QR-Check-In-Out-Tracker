import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  empleados: any[];
  url='http://localhost:3001/api';

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.empleados = [];
  }

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.http.get<any[]>(this.url + '/registros/getEmpleados').subscribe(
      (res) => {
        console.log(res);
        this.empleados = res;
      },
      (err) => {
        console.error('Error al obtener empleados:', err);
      }
    );
  }
  
}
