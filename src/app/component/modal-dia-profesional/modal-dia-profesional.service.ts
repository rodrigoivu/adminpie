import { Injectable,EventEmitter } from '@angular/core';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';


@Injectable({
  providedIn: 'root'
})
export class ModalDiaProfesionalService {
  public id: string;
  public nombre: string;
  public profesion: string;
  public horaSemana: any[];
  public horasDia: any[]=[];
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
  	this.id = id; //esto es el id de user no de profesional
    this.nombre = nombre;
    this.profesion = profesional.profesion;
    this.horaSemana= profesional.horaSemana;
    this.horasDia = profesional.horasDia;
    // if( profesional.horasDia.length === 0){
    //    this.genererHoraDiaVacio();
    // }else{
    //    this.horasDia = profesional.horasDia;
    // }
    this.notificacion.emit(true);
  }

  // genererHoraDiaVacio(){
  //   this.horasDia=[];
  //   let hrs: any[]=[];
  //   let hr: any;

  //   for (var i = 8; i <= 22; i++){
  //     hr={
  //          nombre: 'hora'+i,
  //          hora: i+':00',
  //          valor: false,
  //       };
  //       hrs.push(hr);
  //   }

  //   this.horasDia=[{
  //     dia: '00-00-0000',
  //     horas: hrs
  //   }];
  // }

  guardarDisponibilidadDia( horasDia:any[]){

    let profesional = new Profesional(
        this.id, // este es el user._id
        this.profesion,
        this.horaSemana,
        horasDia
      );
    this._profesionalService.actualizarProfesional(profesional)
           .subscribe(resp => this.notificacionCargarProfesionales.emit(true));
         
  }
}
