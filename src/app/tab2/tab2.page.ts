import { Component } from '@angular/core';
import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';
import { format, parseISO } from 'date-fns';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  optionZbar:any;
  scannedOutput:any;
  date:string|Date|String|any;
  dateFormat: Date;
  transicion: string;


  constructor(public service:UsuarioService, private zbarPlugin: ZBar) {
    this.optionZbar = {
      flash: 'off',
      drawSight: false
    }
    this.scannedOutput='';
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

  saveDate(){

    this.dateFormat = parseISO(this.date)

    this.service.fecha = this.dateFormat;
    this.service.vehiculoId = this.scannedOutput.id;
    this.service.transicion = this.transicion;


    this.service.addTransicion()

    this.date='';
    this.transicion='';
    this.scannedOutput='';


  }
}
