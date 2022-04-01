import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioLoggeado:any
  transicionesList:any[]

  constructor(public http:HttpClient) {
    this.transicionesList = []
    this.getVehiculos()
  }

  getVehiculos(){
    this.http.get('http://localhost:3000/api/vehiculos/getVehiculos').subscribe(
      (res:any)=>{
        //Aqui solo se ejecuta si respondió correctamente
        console.log('Transiciones:',res)
        this.transicionesList = res
      },
      err=>{
        //Aqui solo se ejecuta si no respondió correctamente
        this.transicionesList = []
      }
    )
  }

}
