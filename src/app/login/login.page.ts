import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  registrosList:any[]
  url="http://172.20.10.4:3000/api";
  urlcasa="http://192.168.100.23:3000/api";


  constructor(private router: Router, public service:UsuarioService, public http:HttpClient) { }

  ngOnInit() {
  }

  login() {

    this.http.get(this.urlcasa+'/registros/getRegistros').subscribe(
      (res:any)=>{
        //Aqui solo se ejecuta si respondió correctamente
        // console.log('Resgitros:',res)
        this.registrosList = res
        console.log(this.registrosList)
        for (let i = 0; i < this.registrosList.length; i++) {
          if (this.username === this.registrosList[i].usuario && this.password === this.registrosList[i].contraseña) {
            let infoUser = {
              nombre: this.registrosList[i].nombre,
              usuario: this.registrosList[i].usuario,
              rol: this.registrosList[i].rol,
              id: this.registrosList[i]._id,
            }
            localStorage.setItem('userRutas',JSON.stringify(infoUser));
            this.service.usuarioLoggeado = infoUser;
            this.router.navigate(['tabs','tab1']);
            break;
          }
          else{
            if (this.registrosList.length === i+1) {
              alert("Credenciales Incorrectas");
            }
          }
        }
        this.username = "";
        this.password = "";

      },
      err=>{
        //Aqui solo se ejecuta si no respondió correctamente
        this.registrosList = []
      }
    )
  }



}
