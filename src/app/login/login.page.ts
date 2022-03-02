import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username==='Ruben' && this.password==='12345'){
      let infoUser = {
        nombre: 'Ruben',
        rol: 'student',
        email: 'ruben@gmail.com'
      }
      localStorage.setItem('userRutas',JSON.stringify(infoUser));
      this.router.navigate(['tabs','tab1']);
    }
    else{
      alert('Credenciales incorrectas')
    }
  }

}
