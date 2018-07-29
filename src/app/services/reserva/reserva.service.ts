import { Injectable } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(
  	public http: HttpClient
  ) { }

  crearReserva(reserva: Reserva){

    let url = URL_SERVICIOS + 'api/crear-reserva' ;
    
    return  this.http.post( url, reserva )
          .pipe(
              map( (resp: any) => {
                swal('Reserva creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Error', 'No se pudo guardar reserva', 'error');
                return throwError( err );
              })
          );
  }

  getReservaPorFechaPorUsuario(idUsr:string,fecha:string, repiteDia: number){
    let url = URL_SERVICIOS + 'api/reservasporfechausuario/'+ idUsr+ '?fecha='+ fecha+'&repitedia='+repiteDia;
    return this.http.get( url );
  }
}
