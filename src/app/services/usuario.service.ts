import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { IonDatetime } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioLoggeado:any
  vehiculosList:any[]
  url='http://192.168.1.15:3001/api';
  // datetime:Date = new Date();
  transicion: string;
  fecha: Date|String;
  vehiculoId: string;
  conductorId: string;
  transicionesList:any


  constructor(public http:HttpClient, public alertController:AlertController) {
    this.vehiculosList = []
    this.transicionesList = this.getTransiciones()
  }

  getVehiculos(){
    this.http.get(this.url+'/vehiculos/getVehiculos').subscribe(
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
  
  getTransiciones(){
    const { id } = JSON.parse(localStorage.getItem('userRutas'));

    if (!id.startsWith('CR')) {
      // Hacer algo si el id no comienza con 'CD'
      console.log('El id no comienza con CR');
      return;
    } else {
      this.http.get(this.url+'/transiciones/getTransicion/' + id).subscribe(
        (res:any)=>{
          //Aqui solo se ejecuta si respondió correctamente
          // console.log('Transiciones:',res)
          this.transicionesList = res
        },
        err=>{
          //Aqui solo se ejecuta si no respondió correctamente
          this.transicionesList = []
        }
      )
    }
  }

  addTransicion(){
    let nuevaTransicion = {
      transicion:this.transicion,
      fecha: this.fecha,
      vehiculoId:this.vehiculoId,
      conductorId: this.conductorId,
    }

    this.http.post(this.url+'/transiciones/addTransicion', nuevaTransicion).subscribe(
      async (res:any)=>{
        //Aqui solo se ejecuta si respondió correctamente
        // this.getTransiciones()
        console.log(res)
        // console.log(this.transicion)
        // console.log(this.fecha)
        // console.log(this.vehiculoId)
        
        const alert = await this.alertController.create({
          header: '¡ÉXITO!',
          message: 'Transición guardada correctamente.',
          buttons: ['OK']
        });
  
        await alert.present();


      },
      async err=>{
        //Aqui solo se ejecuta si no respondió correctamente
        const alert = await this.alertController.create({
          header: 'ERROR!',
          message: 'La transación no pudo ser guardada.',
          buttons: ['OK']
        });
  
        await alert.present();
      }
    )
  }


  // deleteFruta(idFruta){
  //   let body = {
  //     id: idFruta
  //   }

  //   this.http.post('url='http://192.168.0.129/api';/frutas/deleteFruta', body).subscribe(
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
