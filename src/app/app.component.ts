/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService} from './services/usuario.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logged: boolean;

  constructor(private router: Router, public usuarioService: UsuarioService) {
    // this.logged = false;

    let userInfo = JSON.parse(localStorage.getItem('userRutas')) //0 datos = null
    this.usuarioService.usuarioLoggeado = userInfo;

    if (userInfo != null) {
      this.router.navigate(['tabs','tab1']);
    }else{
      this.router.navigate(['login']);
    }
  }


}
