import { Injectable, EventEmitter } from '@angular/core';
import { Terapeuta } from '../../models/terapeuta.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class TerapeutaService {
	public token: string;
	public fichaTerapeuta: Terapeuta;
	public notificacionNuevaFicha = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
  	this.inicializaFicha('','','');
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/terapeuta-paciente/' + id ;
    
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              })
          );
  }

  crearFicha(ficha: Terapeuta){
        
    let url = URL_SERVICIOS + 'api/crear-terapeuta' ;
    
    return  this.http.post( url, ficha )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Terapeuta creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'al crear Ficha Terapeuta', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( ficha: Terapeuta ){

    let url = URL_SERVICIOS + 'api/update-terapeuta/' + ficha.paciente +'/'+ficha.fecha;

    return this.http.put( url,ficha )
                .map( (resp: any) =>{
                  swal('Terapeuta', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  registraFicha( idPaciente: string, idUser: string ){

  	let registro: Terapeuta;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number = my.getFullYear();
    let fecha: string =  dia+'-'+  mes + '-'+ ano;
    
    this.inicializaFicha( idPaciente, idUser,fecha);

    this.crearFicha(this.fichaTerapeuta)
    	.subscribe((resp:any) =>{
            this.notificacionNuevaFicha.emit(true);
          });
  }

  inicializaFicha(idPaciente: string, idUser: string, fecha:string){
    this.fichaTerapeuta = new Terapeuta(idPaciente,idUser);
    this.fichaTerapeuta.fecha=fecha;
    this.fichaTerapeuta.actividadesVidaDiaria ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null,
	  actividad9: null,
	  actividad10: null,
	  actividad11: null,
	  actividad12: null,
	  actividad13: null,
	  actividad14: null,
	  actividad15: null,
	  actividad16: null,
	  actividad17: null,
	  actividad18: null
    }
    this.fichaTerapeuta.actividadesInstrumentales ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null,
	  actividad9: null,
	  actividad10: null,
	  actividad11: null,
	  actividad12: null,
	  actividad13: null,
	  actividad14: null    	
    }
    this.fichaTerapeuta.descansoSueno ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null    	
    }
    this.fichaTerapeuta.educacion ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null    	
    }
    this.fichaTerapeuta.ocio ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null    	
    }
    this.fichaTerapeuta.juego ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null,
	  actividad9: null,
	  actividad10: null,
	  actividad11: null,
	  actividad12: null,
	  actividad13: null,
	  actividad14: null,
	  actividad15: null,
	  actividad16: null,
	  actividad17: null,
	  actividad18: null,
	  actividad19: null,
	  actividad20: null,
	  actividad21: null,
	  actividad22: null,
	  actividad23: null,
	  actividad24: null,
	  actividad25: null,
	  actividad26: null,
	  actividad27: null,
	  actividad28: null,
	  actividad29: null,
	  actividad30: null,
	  actividad31: null,
	  actividad32: null,
	  actividad33: null,
	  actividad34: null,
	  actividad35: null,
	  actividad36: null    	
    }
    this.fichaTerapeuta.participacionSocial ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null,
	  actividad9: null,
	  actividad10: null,
	  actividad11: null,
	  actividad12: null,
	  actividad13: null,
	  actividad14: null,
	  actividad15: null,
	  actividad16: null,
	  actividad17: null,
	  actividad18: null,
	  actividad19: null,
	  actividad20: null,
	  actividad21: null,
	  actividad22: null    	
    }
    this.fichaTerapeuta.transversal ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null    	
    }
  }  
}
