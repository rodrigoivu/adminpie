import { Injectable, EventEmitter } from '@angular/core';
import { Anamnesis } from '../../models/anamnesis.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {
	public token: string;
	public fichaAnamnesis: Anamnesis;

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFichaAnamnesis();
  }

  cargarAnamnesis( id: string ){
    let url = URL_SERVICIOS + 'api/anamnesis-paciente/' + id ;
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                //console.log('ANAMNESIS:' + JSON.stringify(resp))
                return resp;

              })
          );
  }
  crearAnamnesis(fichaAnamnesis: Anamnesis){
        
    let url = URL_SERVICIOS + 'api/crear-anamnesis' ;
    
    return  this.http.post( url, fichaAnamnesis )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Anamnesis creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Ficha Anamnesis ya existe', '', 'error');
                return throwError( err );
              })
          );
  }

  actualizarAnamnesis( fichaAnamnesis: Anamnesis ){

    let url = URL_SERVICIOS + 'api/update-anamnesis/' + fichaAnamnesis.paciente;
    //url += '?token=' + this.token;

    return this.http.put( url,fichaAnamnesis )
                .map( (resp: any) =>{
                  //let profesionalDB: Profesional = resp.profesional;
                  swal('Anamnesis', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  inicializaFichaAnamnesis(){
    this.fichaAnamnesis = new Anamnesis('','');
    this.fichaAnamnesis.antecedentesFamiliares={
      nombreMadre: null,
      edadMadre : null,
      escolaridadMadre : null,
      ocupacionMadre : null,
      horarioTrabajoMadre : null,
      nombrePadre : null,
      edadPadre : null,
      escolaridadPadre : null,
      ocupacionPadre : null,
      horarioTrabajoPadre : null,
      descripcionFamiliar : null
    }

  }

  
}
