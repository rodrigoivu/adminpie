import { Injectable } from '@angular/core';
import { General } from '../../models/general.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
	public token: string;
	public fichaGeneral: General;

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha();
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/general-paciente/' + id ;
    
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              })
          );
  }

  crearFicha(ficha: General){
        
    let url = URL_SERVICIOS + 'api/crear-general' ;
    
    return  this.http.post( url, ficha )
          .pipe(
              map( (resp: any) => {
                swal('Ficha General creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'al crear Ficha General', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( ficha: General ){

    let url = URL_SERVICIOS + 'api/update-general/' + ficha.paciente +'/'+ficha.fecha;

    return this.http.put( url,ficha )
                .map( (resp: any) =>{
                  swal('General', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  inicializaFicha(){
    this.fichaGeneral = new General('','');
    this.fichaGeneral.medicaGeneral ={
	    historial : null,
		tartamiento: null,
		diagnosticos: null,
		medicamentos: null   	
    }
  }  
}
