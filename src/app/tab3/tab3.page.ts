import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    url='http://192.168.0.239:3001/api';

  constructor(private camera:Camera, public http:HttpClient, private rutas:Router, public usuarioService:UsuarioService) {  }

  captureImage(){
    let options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
  
      // Obtén el ID del LocalStorage
      let userRutas = JSON.parse(localStorage.getItem('userRutas'));
      let id = userRutas.id;
  
      // Crear el objeto que se enviará en el cuerpo de la petición
      let imageObject = {
        imagen: base64Image,
        id: id
      }
  
      // Enviar la petición HTTP POST
      this.http.post(this.url+'/registros/updateRegistro', imageObject).subscribe(
        (res:any)=>{

          console.log(res);
          this.usuarioService.usuarioLoggeado.imagen = base64Image;
          userRutas.imagen = base64Image;

          // Actualiza la imagen en el localStorage
          localStorage.setItem('userRutas', JSON.stringify(userRutas));

        // // Recarga la página para reflejar los cambios
        //   alert("Imagen actualizada satisfactoriamente");
        },
        err=>{
          alert("No se pudo enviar la imagen");
        }
      );
    }, (err) => {
      console.log(err);
    });
  }
  
  logOut(){
    localStorage.removeItem('userRutas');
    this.rutas.navigate(['/login']);
  }



}
