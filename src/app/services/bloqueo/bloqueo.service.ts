import { Injectable } from '@angular/core';
import { Bloqueo } from '../../models/bloqueo.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class BloqueoService {

  constructor(
  	public http: HttpClient
  ) { }

  cargarBloqueos( desde: number = 0 ){
    let url = URL_SERVICIOS + 'api/bloqueos' ;
    return this.http.get( url );
  }

  crearBloqueo(bloqueo: Bloqueo){

    let url = URL_SERVICIOS + 'api/crear-bloqueo' ;
    
    return  this.http.post( url, bloqueo )
          .pipe(
              map( (resp: any) => {
                swal('Rango bloqueado', 'Creado satisfactoriamente', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Problema al guardar Rango', '', 'error');
                return throwError( err );
              })
          );
  }

  borrarBloqueo( id: string ){
    let url = URL_SERVICIOS + 'api/remove-bloqueo/'+ id ;

    return this.http.delete( url )
                  .map( resp => {
                      swal('Rango Bloqueo borrado', 'El item ha sido eliminado correctamente', 'success');
                      return true;
                  });
  }
}
