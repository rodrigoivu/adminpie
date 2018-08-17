import { Injectable, EventEmitter } from '@angular/core';
import { Psicologia } from '../../models/psicologia.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class PsicologiaService {
	public token: string;
	public fichaPsicologia: Psicologia;
  public notificacionNuevaFicha = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha('','','');
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/psicologia-paciente/' + id ;
    
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                return resp;
              })
          );
  }

  crearFicha(ficha: Psicologia){
        
    let url = URL_SERVICIOS + 'api/crear-psicologia' ;
    
    return  this.http.post( url, ficha )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Psicologia creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'al crear Ficha Psicologia', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( ficha: Psicologia ){

    let url = URL_SERVICIOS + 'api/update-psicologia/' + ficha.paciente +'/'+ficha.fecha;

    return this.http.put( url,ficha )
                .map( (resp: any) =>{
                  swal('Psicologia', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  registraFicha( idPaciente: string, idUser: string ){

    let registro: Psicologia;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number = my.getFullYear();
    let fecha: string =  dia+'-'+  mes + '-'+ ano;
    
    this.inicializaFicha( idPaciente, idUser,fecha);

    this.crearFicha(this.fichaPsicologia)
      .subscribe((resp:any) =>{
            this.notificacionNuevaFicha.emit(true);
          });
  }

  inicializaFicha(idPaciente: string, idUser: string, fecha:string){
    this.fichaPsicologia = new Psicologia(idPaciente,idUser);
    this.fichaPsicologia.fecha=fecha;
    this.fichaPsicologia.establecerVinculo ={
      actividad1: null,
	  actividad2: null,
	  actividad3: null
    }
    this.fichaPsicologia.capacidadesAdaptativas ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
      actividad5: null    
    }
    this.fichaPsicologia.autoconcepto ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null,
	  actividad5: null,
	  actividad6: null,
	  actividad7: null,
	  actividad8: null    	
    }
    this.fichaPsicologia.labilidadEmocional ={
	  actividad1: null,
	  actividad2: null,
	  actividad3: null,
	  actividad4: null    	
    }

  }  
}
