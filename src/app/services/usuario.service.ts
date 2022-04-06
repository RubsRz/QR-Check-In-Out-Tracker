import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { IonDatetime } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioLoggeado:any
  vehiculosList:any[]
  url="http://172.20.10.4:3000/api";
  urlcasa="http://192.168.100.23:3000/api";
  // datetime:Date = new Date();
  transicion: string;
  fecha: Date;
  vehiculoId: string;


  constructor(public http:HttpClient) {
    this.vehiculosList = []
    this.getVehiculos()
  }

  getVehiculos(){
    this.http.get(this.urlcasa+'/vehiculos/getVehiculos').subscribe(
      (res:any)=>{
        //Aqui solo se ejecuta si respondió correctamente
        console.log('Vehiculos:',res)
        this.vehiculosList = res
      },
      err=>{
        //Aqui solo se ejecuta si no respondió correctamente
        this.vehiculosList = []
      }
    )
  }

  addTransicion(){
    let nuevaTransicion = {
      transicion:this.transicion,
      fecha: this.fecha,
      vehiculoId:this.vehiculoId,
    }

    this.http.post(this.urlcasa+'/transiciones/addTransicion', nuevaTransicion).subscribe(
      (res:any)=>{
        //Aqui solo se ejecuta si respondió correctamente
        // this.getTransiciones()
        console.log(res)
        // console.log(this.transicion)
        // console.log(this.fecha)
        // console.log(this.vehiculoId)
        alert("Transicion Agregada Satistactoriamente")
      },
      err=>{
        //Aqui solo se ejecuta si no respondió correctamente
        alert("No se puedo guardar la transicion")
      }
    )
  }


  // deleteFruta(idFruta){
  //   let body = {
  //     id: idFruta
  //   }

  //   this.http.post('http://localhost:3000/api/frutas/deleteFruta', body).subscribe(
  //     (res:any)=>{
  //       //Aqui solo se ejecuta si respondió correctamente
  //       this.getFrutas()
  //     },
  //     err=>{
  //       //Aqui solo se ejecuta si no respondió correctamente
  //       alert("No se puedo eliminar la fruta")
  //     }
  //   )






}
