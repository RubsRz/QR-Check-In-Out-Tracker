import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  registrosList:any[]
  url='http://192.168.0.239:3001/api';


  constructor(private router: Router, public service:UsuarioService, public http:HttpClient, public alertController: AlertController) { }

  ngOnInit() {
  }

  async login() {
    const loginData = {
      username: this.username,
      password: this.password
    };
  
    this.http.post(this.url + '/registros/login', loginData).subscribe(
      async (res: any) => {
        if (res.success) {
          let infoUser = {
            nombre: res.data.nombre,
            usuario: res.data.usuario,
            rol: res.data.rol,
            id: res.data._id,
            imagen: res.data.imagen,
            id_vehiculo: res.data.id_vehiculo
          };
          localStorage.setItem('userRutas', JSON.stringify(infoUser));
          this.service.usuarioLoggeado = infoUser;
          this.router.navigate(['tabs', 'tab1']);
          this.username = '';
          this.password = '';
        } else {
          const alert = await this.alertController.create({
            header: 'Error de inicio de sesión',
            message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            buttons: ['OK']
          });
  
          await alert.present();
          this.password = '';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  
  }
  
  



}
