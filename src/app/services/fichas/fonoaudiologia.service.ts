import { Injectable } from '@angular/core';
import { Fonoaudiologia } from '../../models/fonoaudiologia.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class FonoaudiologiaService {
	public token: string;
	public fichaFonoaudiologia: Fonoaudiologia;

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha();
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/fonoaudiologia-paciente/' + id ;
    
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              })
          );
  }

  crearFicha(ficha: Fonoaudiologia){
        
    let url = URL_SERVICIOS + 'api/crear-fonoaudiologia' ;
    
    return  this.http.post( url, ficha )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Fonoaudiologia creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'al crear Ficha Fonoaudiologia', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( ficha: Fonoaudiologia ){

    let url = URL_SERVICIOS + 'api/update-fonoaudiologia/' + ficha.paciente +'/'+ficha.fecha;

    return this.http.put( url,ficha )
                .map( (resp: any) =>{
                  swal('Fonoaudiologia', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }


  inicializaFicha(){
    this.fichaFonoaudiologia = new Fonoaudiologia('','');
    this.fichaFonoaudiologia.prelinguisticas={
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
	  actividad30: null    	
    }
    this.fichaFonoaudiologia.prearticulatorias ={
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
	  actividad26: null
    }
    this.fichaFonoaudiologia.psicolinguisticas ={
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
	  actividad12: null    	
    }
    this.fichaFonoaudiologia.foneticoFonologico ={
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
	  actividad36: null,
	  actividad37: null,
	  actividad38: null,
	  actividad39: null,
	  actividad40: null,
	  actividad41: null,
	  actividad42: null,
	  actividad43: null,
	  actividad44: null,
	  actividad45: null,
	  actividad46: null,
	  actividad47: null,
	  actividad48: null,
	  actividad49: null,
	  actividad50: null,
	  actividad51: null,
	  actividad52: null,
	  actividad53: null,
	  actividad54: null,
	  actividad55: null,
	  actividad56: null,
	  actividad57: null,
	  actividad58: null,
	  actividad59: null,
	  actividad60: null,
	  actividad61: null,
	  actividad62: null,
	  actividad63: null,
	  actividad64: null,
	  actividad65: null,
	  actividad66: null,
	  actividad67: null,
	  actividad68: null,
	  actividad69: null,
	  actividad70: null,
	  actividad71: null,
	  actividad72: null,
	  actividad73: null,
	  actividad74: null    	
    }
    this.fichaFonoaudiologia.semantico ={
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
	  actividad28: null    	
    }
    this.fichaFonoaudiologia.morfosintactico ={
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
	  actividad25: null    	
    }
    this.fichaFonoaudiologia.pragmatico ={
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
	  actividad28: null    	
    }
    this.fichaFonoaudiologia.discursoNarrativo ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null    	
    }
    this.fichaFonoaudiologia.socialComunicativa ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null    	
    }

  }  
}
