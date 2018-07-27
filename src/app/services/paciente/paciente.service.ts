import { Injectable } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(
  	public http: HttpClient
  ) { }

  cargarPacientes( desde: number = 0 ){
    let url = URL_SERVICIOS + 'api/pacientes' + '?desde='+ desde;
    return this.http.get( url );
  }

  crearPaciente(paciente: Paciente){
        console.log(paciente.name);
        console.log(paciente);
    let url = URL_SERVICIOS + 'api/crear-paciente' ;
    
    return  this.http.post( url, paciente )
          .pipe(
              map( (resp: any) => {
                swal('Paciente creado', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Paciente ya existe', '', 'error');
                return throwError( err );
              })
          );
  }

  

}
