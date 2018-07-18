import { Injectable,EventEmitter  } from '@angular/core';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { URL_SERVICIOS } from '../../config/config';
// import { HttpClient } from '@angular/common/http';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';
//import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ModalSemanaProfesionalService {
	public id: string; // Este id es de User._id No de Professional._id
  public nombre: string;
  public profesion: string;
  public horaSemana: any[];
	public token: string;
	public oculto: string='oculto';
	public notificacion = new EventEmitter<any>();
  public notificacionCargarProfesionales = new EventEmitter<any>();

  constructor(
      public _profesionalService: ProfesionalService,
    ) { 
    this.token = localStorage.getItem('token');
  }
  
  ocultarModal(){
  	this.oculto = 'oculto';
  	this.id = null;
  }

  mostrarModal( id: string, nombre: string, profesional: Profesional ){
  	this.oculto = '';
  	this.id = id;
    this.nombre = nombre;
    this.profesion = profesional.profesion;
    
    if( profesional.horaSemana.length === 0){
       this.llenarHoraSemanaVacio();
    }else{
        this.horaSemana = profesional.horaSemana;
    }
   

    this.notificacion.emit(true);

  }

  llenarHoraSemanaVacio(){
    var hrs: any[]=[];
    var hr: any;
    for (var i = 8; i <= 22; i++) {
      hr={
        horaLu: false,
        horaMa: false,
        horaMi: false,
        horaJu: false,
        horaVi: false,
        horaSa: false,
        horaDo: false,
        nombreLu: "horaLu"+i,
        nombreMa: "horaMa"+i,
        nombreMi: "horaMi"+i,
        nombreJu: "horaJu"+i,
        nombreVi: "horaVi"+i,
        nombreSa: "horaSa"+i,
        nombreDo: "horaDo"+i,
        hora: i+":00"
      }
      hrs.push(hr);
    }

    this.horaSemana = hrs;
  }

  guardarDisponibilidadSemanal(horaSemanal:any[]){

    let profesional = new Profesional(
        this.id, // este es el user._id
        this.profesion,
        horaSemanal
      );
   this._profesionalService.actualizarProfesional(profesional)
           .subscribe(resp => this.notificacionCargarProfesionales.emit(true));
         
  }
}
