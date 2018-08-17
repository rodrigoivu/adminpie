import { Injectable, EventEmitter } from '@angular/core';
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
  public notificacionNuevaFicha = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha('','','');
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

  registraFicha( idPaciente: string, idUser: string ){

    let registro: General;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number = my.getFullYear();
    let fecha: string =  dia+'-'+  mes + '-'+ ano;
    
    this.inicializaFicha( idPaciente, idUser,fecha);

    this.crearFicha(this.fichaGeneral)
      .subscribe((resp:any) =>{
            this.notificacionNuevaFicha.emit(true);
          });
  }

  inicializaFicha(idPaciente: string, idUser: string, fecha:string){
    this.fichaGeneral = new General(idPaciente,idUser);
    this.fichaGeneral.fecha=fecha;
    this.fichaGeneral.medicaGeneral ={
	    historial : null,
		tartamiento: null,
		diagnosticos: null,
		medicamentos: null   	
    }
  }  
}
