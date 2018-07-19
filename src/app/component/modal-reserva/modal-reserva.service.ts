import { Injectable,EventEmitter } from '@angular/core';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { URL_SERVICIOS } from '../../config/config';
// import { HttpClient } from '@angular/common/http';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaService {
  public id: string;
  public nombre: string;
  public profesion: string;
  public horaSemana: any[]=[];
  public horasDia: any[]=[];
  public token: string;
  public oculto: string='oculto';
  public notificacion = new EventEmitter<any>();
  public notificacionCargarProfesionales = new EventEmitter<any>();

  constructor(
     //public http: HttpClient,
     public _profesionalService: ProfesionalService,
    ) {
  	this.token = localStorage.getItem('token');
   }

  ocultarModal(){
  	this.oculto = 'oculto';
  	this.id = null;
  }

  mostrarModal( id: string, nombre: string,  profesional: Profesional  ){
  	this.oculto = '';
  	this.id = id;
    this.nombre = nombre;
    this.profesion = profesional.profesion;
    this.horaSemana= profesional.horaSemana;
    this.horasDia = profesional.horasDia;

    this.notificacion.emit(true);
  } 

  // cargarHorasDisp( model: NgbDateStruct ){
  //    let url = URL_SERVICIOS + 'api/users' ;
  //    return this.http.get( url );
  // }
  
  guardarDisponibilidadDia( horasDia:any[]){

    // let profesional = new Profesional(
    //     this.id, // este es el user._id
    //     this.profesion,
    //     this.horaSemana,
    //     horasDia
    //   );
  //   this._profesionalService.actualizarProfesional(profesional)
  //          .subscribe(resp => this.notificacionCargarProfesionales.emit(true));
         
   }

}
