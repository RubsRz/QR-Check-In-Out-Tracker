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
  url='http://192.168.1.15:3001/api';


  constructor(private router: Router, public service:UsuarioService, public http:HttpClient, public alertController: AlertController) { }

  ngOnInit() {
  }

  async login() {
    this.http.get(this.url + '/registros/getRegistros').subscribe(
      async (res: any) => {
        this.registrosList = res;
        let found = false;
  
        for (let i = 0; i < this.registrosList.length; i++) {
          if (this.username === this.registrosList[i].usuario && this.password === this.registrosList[i].contraseña) {
            let infoUser = {
              nombre: this.registrosList[i].nombre,
              usuario: this.registrosList[i].usuario,
              rol: this.registrosList[i].rol,
              id: this.registrosList[i]._id,
              imagen: this.registrosList[i].imagen,
            };
            localStorage.setItem('userRutas', JSON.stringify(infoUser));
            this.service.usuarioLoggeado = infoUser;
            this.router.navigate(['tabs', 'tab1']);
            found = true;
            break;
          }
        }
  
        this.username = '';
        this.password = '';
  
        if (!found) {
          const alert = await this.alertController.create({
            header: 'Error de inicio de sesión',
            message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            buttons: ['OK']
          });
  
          await alert.present();
        }
      },
      (err) => {
        this.registrosList = [];
      }
    );
  }
  



}
