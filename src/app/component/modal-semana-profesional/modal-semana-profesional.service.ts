import { Injectable,EventEmitter  } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';

@Injectable({
  providedIn: 'root'
})
export class ModalSemanaProfesionalService {
	public id: string; // Este id es de User._id No de Professional._id
  public nombre: string;
  public profesion: string;
	public token: string;
	public oculto: string='oculto';
	public notificacion = new EventEmitter<any>();

  constructor(
      public _profesionalService: ProfesionalService,
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

  guardarDisponibilidadSemanal(horaSemanal:any[]){
    let profesional = new Profesional(
        this.id, // este es el user._id
        this.profesion,
        horaSemanal
      );
   this._profesionalService.actualizarProfesional(profesional)
           .subscribe();
         
  }
}
