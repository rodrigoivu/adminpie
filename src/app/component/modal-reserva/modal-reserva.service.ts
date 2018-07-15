import { Injectable,EventEmitter } from '@angular/core';

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
}
