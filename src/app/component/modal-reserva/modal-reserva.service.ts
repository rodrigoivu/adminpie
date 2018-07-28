import { Injectable,EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { URL_SERVICIOS } from '../../config/config';
// import { HttpClient } from '@angular/common/http';
import { ProfesionalService, BloqueoService, ReservaService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';
import { Bloqueo } from '../../models/bloqueo.model';
import { Reserva } from '../../models/reserva.model';



interface PosHora{ // de la base de datos
    pos: number
};

@Injectable({
  providedIn: 'root'
})
export class ModalReservaService {
  public id: string;  // este id es de user
  public nombre: string;  //Nombre de user
  public profesion: string;
  public horaSemana: any[]=[];
  public horasDia: any[]=[];
  public token: string;
  public oculto: string='oculto';
  public ocultoCreaReserva: string='oculto';
  public notificacion = new EventEmitter<any>();
  public notificacionCreaReserva = new EventEmitter<any>();
  public notificacionCargarProfesionales = new EventEmitter<any>();
  public itemsBloqueados: Bloqueo[]=[];

  //información para pasar a la ventana crear reserva
  public fecha:NgbDateStruct;
  public numeroDiaSemana: number;
  public posEnLista: number;
  public poshora: PosHora[];
  public horaReserva: number;

  constructor(
     //public http: HttpClient,
     public _profesionalService: ProfesionalService,
     public _bloqueoService: BloqueoService,
     public _reservaService: ReservaService
    ) {
  	this.token = localStorage.getItem('token');
    this.cargarBloqueos();
   }

  

  ocultarModalCreaReserva(){
    this.ocultoCreaReserva = 'oculto';
  }

  mostrarModalCreaReserva(fecha: NgbDateStruct, numeroDiaSemana: number,posEnLista: number, poshora:PosHora[], hora: number){
    
    this.fecha=fecha;
    this.numeroDiaSemana=numeroDiaSemana;
    this.posEnLista=posEnLista;
    this.poshora=poshora;
    this.horaReserva=hora;

    this.ocultoCreaReserva = '';
    this.notificacionCreaReserva.emit(true);
  }

  ocultarModal(){
    this.oculto = 'oculto';
    //this.id = null;
  }

  mostrarModal( id: string, nombre: string,  profesional: Profesional  ){
  	this.oculto = '';
  	this.id = id;  // este id es el de user
    this.nombre = nombre; //Nombre de user
    this.profesion = profesional.profesion;
    this.horaSemana= profesional.horaSemana;
    this.horasDia = profesional.horasDia;

    this.notificacion.emit(true);

  } 

  cargarBloqueos(){
    this._bloqueoService.cargarBloqueos()
      .subscribe( (resp: any) =>{
        this.itemsBloqueados=resp.bloqueos;
      });

  }


  // cargarHorasDisp( model: NgbDateStruct ){
  //    let url = URL_SERVICIOS + 'api/users' ;
  //    return this.http.get( url );
  // }
  
  guardarReserva(idPaciente:string, fecha:string, hora: number, posHora: any[] ){

    let reserva = new Reserva(
         idPaciente, 
         this.id , //este es el usuario relacionado con el profesional
         fecha,
         hora,
         posHora,
         '',
         'VACIO',
         ''
      );
    console.log(reserva);
    this._reservaService.crearReserva(reserva)
           .subscribe(resp => console.log(resp));
         
   }


   
}
