import { Injectable, EventEmitter } from '@angular/core';
import { Pesquisa } from '../../models/pesquisa.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  public token: string;
  public pesquisa: Pesquisa;
  public notificacionActualizado = new EventEmitter<any>();
 
  constructor(
  	public http: HttpClient,
    public _subirArchivoService: SubirArchivoService
  ) { 

  	this.token = localStorage.getItem('token');

  }

  crearPesquisa(pesquisa: Pesquisa){
        // console.log(paciente.name);
        // console.log(paciente);
    let url = URL_SERVICIOS + 'api/crear-pesquisa' ;
    
    return  this.http.post( url, pesquisa )
          .pipe(
              map( (resp: any) => {
                swal('Pesquisa creada', '', 'success');
                return resp.pesquisa;
              }),
              catchError( err => {
                swal( 'Error al crear pesquisa', 'Ya existe una pesquisa para este periodo', 'error');
                return throwError( err );
              })
          );
  }

  actualizaPesquisa( pesquisa: Pesquisa, pesquisaId:string ){

    let url = URL_SERVICIOS + 'api/update-pesquisa/' + pesquisaId;
    //url += '?token=' + this.token;

    return this.http.put( url,pesquisa )
                .map( (resp: any) =>{
                  swal('Modificación guardada', 'Pesquisa actualizada correctamente', 'success' );
                  return true;
                });
  }

  cargarPesquisas(  ){
    let url = URL_SERVICIOS + 'api/pesquisas';
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
  
  buscarPesquisa(pesquisaId: string){
     let url = URL_SERVICIOS + 'api/pesquisa/' + pesquisaId;
     return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                this.pesquisa = resp.pesquisa;
                return resp;

              }),
              catchError( err => {
                return err ;
              })
          );
  }

  guardarArchivo( archivo: File, pesquisaId: string,  usuario:string){
    this._subirArchivoService.adjuntarArchivoXls( archivo, pesquisaId, this.token, usuario )
          .then ( (resp: any) =>{

            swal('Archivo cargado','', 'success');
            this.notificacionActualizado.emit(true)

          })
          .catch( resp =>{
            console.log ( resp );
          })
  }


}
