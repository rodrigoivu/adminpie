import { Injectable, EventEmitter } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

interface NgbDate {
  day: number,
  month: number,
  year: number
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  public token: string;
  public pacienteSeleccionado: Paciente;
  public notificacionVerFichas = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) {

    this.token = localStorage.getItem('token');

   }

  cargarPacientes( desde: number = 0 ){
    let url = URL_SERVICIOS + 'api/pacientes' + '?desde='+ desde;
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

  crearPaciente(paciente: Paciente){
        // console.log(paciente.name);
        // console.log(paciente);
    let url = URL_SERVICIOS + 'api/crear-paciente' ;
    
    return  this.http.post( url, paciente )
          .pipe(
              map( (resp: any) => {
                swal('Paciente creado', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error al crear paciente', 'Verificar si ya existe o hay un error en los datos ingresados', 'error');
                return throwError( err );
              })
          );
  }

  buscarPacientes( termino: string ){
    let url = URL_SERVICIOS + 'api/busqueda/pacientes/'+termino+ '?token=' + this.token;

    return this.http.get( url )
                .map((resp: any) => resp.pacientes );
  }

  verFichasPaciente(paciente: Paciente){

    this.pacienteSeleccionado = paciente;
    
  }


}
