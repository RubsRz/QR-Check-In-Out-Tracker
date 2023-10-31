import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  empleados: any[];
  url='http://192.168.0.227:3001/api';
  empleadoEnEdicion: any; // Empleado en modo de edición
  isEditing = false; // Indica si estamos en modo de edición
  vehiculos: any[];
  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.empleados = [];
  }

  ionViewWillEnter() {
    // Limpia los empleados existentes
    this.empleados = [];
  
    // Crea una nueva Promesa que se resuelve cuando se ha recuperado el 'id' de 'localStorage'
    new Promise((resolve, reject) => {
      const userRutas = JSON.parse(localStorage.getItem('userRutas'));
  
      // Comprueba si 'userRutas' existe y tiene una propiedad 'id'
      if (userRutas && userRutas.id) {
        resolve(userRutas.id);
      } else {
        reject('No se encontró id en userRutas');
      }
    })
    .then((id) => {
      // Cuando la Promesa se resuelve, llama a 'obtenerEmpleados()' con el 'id'
      this.obtenerEmpleados(id);
    })
    .catch((error) => {
      // Si algo sale mal, registra el error
      console.error(error);
    });
  }

  ngOnInit() {
  }
  
  

  obtenerEmpleados(id) {
    // const { id } = JSON.parse(localStorage.getItem('userRutas'));

    this.http.get<any[]>(this.url + '/registros/getEmpleados/' + id).subscribe(
      (res) => {
        console.log(res);
        this.empleados = res;
      },
      (err) => {
        console.error('Error al obtener empleados:', err);
      }
    );
  }

  // Iniciar edición de un empleado
  editarEmpleado(empleado) {
    this.empleadoEnEdicion = { ...empleado }; // Clonar el empleado para no modificar el original
    this.isEditing = true;
    console.log(this.empleadoEnEdicion);
    //consulta para obtener los vehiculos sin empleados
    this.http.get(this.url + '/vehiculos/getEmptyVehiculos').subscribe(
      (res:any)=>{
        console.log('vehiculos sin asignar: '+ res);
        this.vehiculos = res;
      },
      (err) => {
        console.error('Error al obtener los vehiculos vacios:', err);
      }
    );

  }
  // cancelar edicion
  cancelar() {
    this.empleadoEnEdicion = ''; // Clonar el empleado para no modificar el original
    this.isEditing = false;
  }

  // Guardar los cambios al empleado
  guardarCambios() {
    console.log(this.empleadoEnEdicion); 
    console.log(typeof(this.empleadoEnEdicion)); 
    // Realiza aquí la lógica para guardar los cambios en el servidor
    this.http.post(this.url+'/registros/updateEmpleado', this.empleadoEnEdicion).subscribe(
      (res:any)=>{
        console.log(res)
        location.reload();
      },
      err=>{
        alert("No se puedo editar el empleado")
      }
    )
    
    // Desactiva el modo de edición
    this.isEditing = false;
    // console.log("Guardar los cambios de " + this.empleadoEnEdicion._id)

  }
}
