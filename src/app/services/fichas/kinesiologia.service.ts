import { Injectable, EventEmitter } from '@angular/core';
import { Kinesiologia } from '../../models/kinesiologia.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class KinesiologiaService {
	public token: string;
	public fichaKinesiologia: Kinesiologia;
	public notificacionNuevaFicha = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha('','','');
  }

  listaFichas( ){
    let url = URL_SERVICIOS + 'api/lista-fichas-kinesiologia' ;
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              }),
              catchError( err => {
                return err ;
              })
          );
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/kinesiologia-paciente/' + id ;
    
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              })
          );
  }

  crearFicha(ficha: Kinesiologia){
        
    let url = URL_SERVICIOS + 'api/crear-kinesiologia' ;
    
    return  this.http.post( url, ficha )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Kinesiologia creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'al crear Ficha Kinesiologia', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( ficha: Kinesiologia ){

    let url = URL_SERVICIOS + 'api/update-kinesiologia/' + ficha.paciente +'/'+ficha.fecha;

    return this.http.put( url,ficha )
                .map( (resp: any) =>{
                  swal('Kinesiologia', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  registraFicha( idPaciente: string, idUser: string ){

  	let registro: Kinesiologia;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number = my.getFullYear();
    let fecha: string =  dia+'-'+  mes + '-'+ ano;
    
    this.inicializaFicha( idPaciente, idUser,fecha);

    this.crearFicha(this.fichaKinesiologia)
    	.subscribe((resp:any) =>{
            this.notificacionNuevaFicha.emit(true);
          });
  }

  inicializaFicha(idPaciente: string, idUser: string, fecha:string){
    this.fichaKinesiologia = new Kinesiologia(idPaciente,idUser);
    this.fichaKinesiologia.fecha=fecha;    
    this.fichaKinesiologia.estabilidadDesplazamiento ={
	   objetivoEsp1: null,
	   objetivoEsp2: null,
	   objetivoEsp3: null,
	   objetivoEsp4: null,
	   objetivoEsp5: null,
	   objetivoEsp6: null,
	   objetivoEsp7: null,
	   objetivoEsp8: null,
	   objetivoEsp9: null,
	   objetivoEsp10: null,
	   objetivoEsp11: null,
	   objetivoEsp12: null,
	   objetivoEsp13: null,
	   objetivoEsp14: null,
	   objetivoEsp15: null,
	   objetivoEsp16: null,
	   objetivoEsp17: null,
	   objetivoEsp18: null,
	   objetivoEsp19: null,
	   objetivoEsp20: null,
	   objetivoEsp21: null,
	   objetivoEsp22: null,
	   objetivoEsp23: null,
	   objetivoEsp24: null,
	   objetivoEsp25: null,
	   objetivoEsp26: null,
	   objetivoEsp27: null,
	   objetivoEsp28: null,
	   objetivoEsp29: null,
	   objetivoEsp30: null,
	   objetivoEsp31: null,
	   objetivoEsp32: null,
	   objetivoEsp33: null,
	   objetivoEsp34: null,
	   objetivoEsp35: null,
	   objetivoEsp36: null,
	   objetivoEsp37: null
    }
    this.fichaKinesiologia.coordinacionDinamica ={
	   objetivoEsp1: null,
	   objetivoEsp2: null,
	   objetivoEsp3: null,
	   objetivoEsp4: null,
	   objetivoEsp5: null,
	   objetivoEsp6: null,
	   objetivoEsp7: null,
	   objetivoEsp8: null,
	   objetivoEsp9: null,
	   objetivoEsp10: null,
	   objetivoEsp11: null,
	   objetivoEsp12: null,
	   objetivoEsp13: null,
	   objetivoEsp14: null,
	   objetivoEsp15: null,
	   objetivoEsp16: null,
	   objetivoEsp17: null,
	   objetivoEsp18: null,
	   objetivoEsp19: null,
	   objetivoEsp20: null,
	   objetivoEsp21: null,
	   objetivoEsp22: null,
	   objetivoEsp23: null,
	   objetivoEsp24: null,
	   objetivoEsp25: null,
	   objetivoEsp26: null,
	   objetivoEsp27: null,
	   objetivoEsp28: null    	
    }
    this.fichaKinesiologia.conductasPsicomotoras ={
	   objetivoEsp1: null,
	   objetivoEsp2: null,
	   objetivoEsp3: null,
	   objetivoEsp4: null,
	   objetivoEsp5: null,
	   objetivoEsp6: null,
	   objetivoEsp7: null,
	   objetivoEsp8: null,
	   objetivoEsp9: null,
	   objetivoEsp10: null,
	   objetivoEsp11: null,
	   objetivoEsp12: null,
	   objetivoEsp13: null,
	   objetivoEsp14: null,
	   objetivoEsp15: null,
	   objetivoEsp16: null,
	   objetivoEsp17: null,
	   objetivoEsp18: null,
	   objetivoEsp19: null,
	   objetivoEsp20: null,
	   objetivoEsp21: null,
	   objetivoEsp22: null,
	   objetivoEsp23: null,
	   objetivoEsp24: null,
	   objetivoEsp25: null,
	   objetivoEsp26: null,
	   objetivoEsp27: null,
	   objetivoEsp28: null,
	   objetivoEsp29: null,
	   objetivoEsp30: null,
	   objetivoEsp31: null,
	   objetivoEsp32: null,
	   objetivoEsp33: null,
	   objetivoEsp34: null,
	   objetivoEsp35: null,
	   objetivoEsp36: null,
	   objetivoEsp37: null,
	   objetivoEsp38: null,
	   objetivoEsp39: null    	
    }
    this.fichaKinesiologia.alineacionPostural ={
	   objetivoEsp1: null,
	   objetivoEsp2: null,
	   objetivoEsp3: null,
	   objetivoEsp4: null,
	   objetivoEsp5: null,
	   objetivoEsp6: null,
	   objetivoEsp7: null,
	   objetivoEsp8: null,
	   objetivoEsp9: null,
	   objetivoEsp10: null,
	   objetivoEsp11: null,
	   objetivoEsp12: null,
	   objetivoEsp13: null,
	   objetivoEsp14: null,
	   objetivoEsp15: null,
	   objetivoEsp16: null,
	   objetivoEsp17: null,
	   objetivoEsp18: null,
	   objetivoEsp19: null,
	   objetivoEsp20: null,
	   objetivoEsp21: null,
	   objetivoEsp22: null,
	   objetivoEsp23: null,
	   objetivoEsp24: null,
	   objetivoEsp25: null,
	   objetivoEsp26: null,
	   objetivoEsp27: null,
	   objetivoEsp28: null,
	   objetivoEsp29: null,
	   objetivoEsp30: null,
	   objetivoEsp31: null,
	   objetivoEsp32: null,
	   objetivoEsp33: null,
	   objetivoEsp34: null,
	   objetivoEsp35: null    	
    }
  }  
}
