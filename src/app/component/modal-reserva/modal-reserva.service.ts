import { Injectable,EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaService {
  public id: string;
  public nombre: string;
  public profesion: string;
  public token: string;
  public oculto: string='oculto';
  public notificacion = new EventEmitter<any>();

  constructor(
     public http: HttpClient
    ) {
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

  cargarHorasDisp( model: NgbDateStruct ){
     let url = URL_SERVICIOS + 'api/users' ;
     return this.http.get( url );
  }
}
