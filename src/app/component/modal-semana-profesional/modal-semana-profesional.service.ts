import { Injectable,EventEmitter  } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalSemanaProfesionalService {
	public id: string;
  public nombre: string;
  public profesion: string;
	public token: string;
	public oculto: string='oculto';
	public notificacion = new EventEmitter<any>();

  constructor() { 
    this.token = localStorage.getItem('token');
  }
  
  ocultarModal(){
  	this.oculto = 'oculto';
  	this.id = null;
  }

  mostrarModal( id: string, nombre: string, profesion: string ){
  	this.oculto = '';
  	this.id = id;
    this.nombre = nombre;
    this.profesion = profesion;
  }

  guardarDisponibilidadSemanal( ){

    let url = URL_SERVICIOS + 'api/update-user/' + this.id;
    return true;
    // return this.http.put( url,usuario )
    //             .map( (resp: any) =>{
    //               if ( usuario._id === this.usuario._id){  // esta función se llama desde el perfil donde es el mismo usuario y se guarda en el storage. Y se llama de la lista de usuarios en mantenimiento, donde el mismo usuario no deberia entrar
    //                 let usuarioDB: User = resp.user;
    //                 this.guardarStorage ( usuarioDB._id, this.token, usuarioDB, this.ROUTES);
    //               }
                  
    //               swal('Usuario actualizado', usuario.name, 'success' );
    //               return resp.user;
    //             });
  }
}
