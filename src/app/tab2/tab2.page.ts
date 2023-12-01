import { Component } from '@angular/core';
import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';
import { format, parseISO } from 'date-fns';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  optionZbar:any;
  scannedOutput:any;
  date:string|Date|String|any;
  dateFormat: Date|String;
  transicion: string;
  transiciones:any;

  constructor(public service:UsuarioService, private zbarPlugin: ZBar,  public alertController: AlertController) {
    this.optionZbar = {
      flash: 'off',
      drawSight: false
    }
    this.scannedOutput='';
  }

  async ionViewWillEnter() {
    this.transiciones = this.service.transicionesList
    console.log(this.transiciones)
  }

  barcodeScanner(){
    this.zbarPlugin.scan(this.optionZbar)
    .then(respone => {
      console.log(respone);
      this.scannedOutput = JSON.parse(respone);
      console.log(this.scannedOutput)
    })
    .catch(error => {
      alert(error);
    });
  }

  async saveDate(){

    if (this.scannedOutput == '') {
      const alert = await this.alertController.create({
        header: 'Acción no disponible',
        message: 'Necesitas escanear un código QR para poder registrar una Transición.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      // Convierte la fecha a un objeto Moment.js
      this.dateFormat = moment(this.date).toISOString();

      console.log(this.dateFormat)

      this.service.fecha = this.dateFormat;
      this.service.vehiculoId = this.scannedOutput.id_vehiculo;
      this.service.transicion = this.transicion;
      this.service.conductorId = this.scannedOutput._id


      this.service.addTransicion()

      this.date='';
      this.transicion='';
      this.scannedOutput='';
    }
  }

  expandirDetalles(transicion: any) {
    // Lógica para expandir detalles (si es necesario)
    // console.log('Detalles expandidos:', transicion);
    transicion.expandido = !transicion.expandido; // Cambia el estado de expandido
  }








}
