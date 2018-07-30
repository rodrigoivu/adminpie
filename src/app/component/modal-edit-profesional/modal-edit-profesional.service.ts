import { Injectable,EventEmitter } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalService } from '../../services/service.index';

@Injectable({
  providedIn: 'root'
})
export class ModalEditProfesionalService {
  public id: string; // este es el id de user
  public nombre: string;
  public profesion: string;
	public token: string;
	public oculto: string='oculto';
	public notificacion = new EventEmitter<any>();
  public notificacionCargarProfesionales = new EventEmitter<any>();

  constructor(
      public _profesionalService: ProfesionalService
    ) { 
    this.token = localStorage.getItem('token');
  }
  
  ocultarModal(){
  	this.oculto = 'oculto';
  	//this.id = null;
  }

  mostrarModal( id: string, nombre: string, profesion: string ){
  	this.oculto = '';
  	this.id = id;  // este es el id de user
    this.nombre = nombre;
    this.profesion = profesion;

    this.notificacion.emit(true);
  }

  actualizaProfesional(profesion: string){
    let profesional = new Profesional(
        this.id, // este es el user._id
        profesion

      );
    this._profesionalService.actualizarProfesional(profesional)
           .subscribe(resp => this.notificacionCargarProfesionales.emit(true));
         
  }
  }
}
