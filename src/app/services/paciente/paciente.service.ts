import { Injectable, EventEmitter } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

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
  public notificacionActualizado = new EventEmitter<any>();

  constructor(
  	public http: HttpClient,
    public _subirArchivoService: SubirArchivoService
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
                return resp.paciente;
              }),
              catchError( err => {
                swal( 'Error al crear paciente', 'Verificar si ya existe o hay un error en los datos ingresados', 'error');
                return throwError( err );
              })
          );
  }

  actualizaPaciente( paciente: Paciente, pacienteId:string ){

    let url = URL_SERVICIOS + 'api/update-paciente/' + pacienteId;
    //url += '?token=' + this.token;

    return this.http.put( url,paciente )
                .map( (resp: any) =>{
                  swal('Modificación guardada', 'Paciente actualizado correctamente', 'success' );
                  return true;
                });
  }

  buscarPacientes( termino: string ){
    let url = URL_SERVICIOS + 'api/busqueda/pacientes/'+termino+ '?token=' + this.token;

    return this.http.get( url )
                .map((resp: any) => resp.pacientes );
  }

  verFichasPaciente(paciente: Paciente){

    this.pacienteSeleccionado = paciente;
    
  }

  verAdjuntosPaciente(paciente: Paciente){

    this.pacienteSeleccionado = paciente;
    
  }

  guardarArchivo( archivo: File, idPaciente: string, itemArchivo:string, profesionalProfesion:string){
    this._subirArchivoService.adjuntarArchivo( archivo, itemArchivo, idPaciente, this.token, profesionalProfesion )
          .then ( (resp: any) =>{

            swal('Archivo cargado','', 'success');
            this.notificacionActualizado.emit(true)

          })
          .catch( resp =>{
            console.log ( resp );
          })
  }

  buscarPaciente(pacienteId: string){
     let url = URL_SERVICIOS + 'api/paciente/' + pacienteId;
     return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                this.pacienteSeleccionado = resp.paciente;
                return resp;

              }),
              catchError( err => {
                return err ;
              })
          );
  }


}
