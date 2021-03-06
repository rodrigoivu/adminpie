import { Injectable} from '@angular/core';
import { User } from '../../models/user.model';
import { Profesional } from '../../models/profesional.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
//import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { RouteInfo } from '../../shared/sidebar/sidebar.metadata';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  public token: string;

  constructor(
  	public http: HttpClient,
    public router: Router,
  ) { 
    this.token = localStorage.getItem('token');

  }

 
  actualizarProfesional( profesional: Profesional ){

    let url = URL_SERVICIOS + 'api/update-profesional/' + profesional.user;
    //url += '?token=' + this.token;

    return this.http.put( url,profesional )
                .map( (resp: any) =>{
                  //let profesionalDB: Profesional = resp.profesional;
                  swal('Modificación guardada', 'Profesional actualizado correctamente', 'success' );
                  return true;
                });
  }

  cargarProfesionales( desde: number = 0 ){
    let url = URL_SERVICIOS + 'api/profesionales' + '?desde='+ desde;
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {

                return resp;

              })
          );
  }

  crearProfesional(idUser: string){
    var profesional= new Profesional(idUser); // esto es porque ne model se definio el id user como unico parametro obligatorio
    
    let url = URL_SERVICIOS + 'api/crear-profesional' ;
    
    return  this.http.post( url, profesional )
          .pipe(
              map( (resp: any) => {
                swal('Profesional creado', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Profesional ya existe', '', 'error');
                return throwError( err );
              })
          );
  }

  buscarProfesionales( termino: string ){
    let url = URL_SERVICIOS + 'api/busqueda/profesionales/'+termino+ '?token=' + this.token;
    return this.http.get( url )
                .map((resp: any) => resp.profesionales );
  }

  buscarProfesional( idUser: string ){
    let url = URL_SERVICIOS + 'api/profesional/'+idUser;

    return this.http.get( url )
                .map((resp: any) => resp.profesional );
  }

  buscarProfesion( idUser: string ){
    let url = URL_SERVICIOS + 'api/profesional/'+idUser;

    return this.http.get( url )
                .map((resp: any) => resp.profesional.profesion );
  }

  borrarProfesional( id: string ){
    let url = URL_SERVICIOS + 'api/remove-profesional/'+ id ;

    return this.http.delete( url )
          .pipe(
              map( (resp: any) => {
                
                return true;
              }),
              catchError( err => {
                
                return throwError( err );
              })
          );
  }

}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYiLCJuYW1lIjoiUm9kcmlnbyIsInN1cm5hbWUiOm51bGwsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTl9ST0xFIiwiaW1hZ2UiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYtMzEwLmpwZyIsImlhdCI6MTUzNTAzMDQxNywiZXhwIjoxNTM1MDg0NDE3fQ.7v28OrIrGBNzbFYKI5urUYNaTPhXb_J50ewD9mxIunQ
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYiLCJuYW1lIjoiUm9kcmlnbyIsInN1cm5hbWUiOm51bGwsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTl9ST0xFIiwiaW1hZ2UiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYtMzEwLmpwZyIsImlhdCI6MTUzNTExMjA3NywiZXhwIjoxNTM1MTY2MDc3fQ.rxEnzI6La-7PlF6qYsNH2La8hqPuKTTJd7xWgEczEbg
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYiLCJuYW1lIjoiUm9kcmlnbyIsInN1cm5hbWUiOm51bGwsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTl9ST0xFIiwiaW1hZ2UiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYtMzEwLmpwZyIsImlhdCI6MTUzNTExMjA3NywiZXhwIjoxNTM1MTY2MDc3fQ.rxEnzI6La-7PlF6qYsNH2La8hqPuKTTJd7xWgEczEbg
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYiLCJuYW1lIjoiUm9kcmlnbyIsInN1cm5hbWUiOm51bGwsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTl9ST0xFIiwiaW1hZ2UiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYtMzEwLmpwZyIsImlhdCI6MTUzNTExMjA3NywiZXhwIjoxNTM1MTY2MDc3fQ.rxEnzI6La-7PlF6qYsNH2La8hqPuKTTJd7xWgEczEbg
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYiLCJuYW1lIjoiUm9kcmlnbyIsInN1cm5hbWUiOm51bGwsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTl9ST0xFIiwiaW1hZ2UiOiI1YjMzZTJlMTBhYmRmZDBmYTIxNDlmNzYtMzEwLmpwZyIsImlhdCI6MTUzNTExMDE5OSwiZXhwIjoxNTM1MTY0MTk5fQ.VyKE-QwlGGroijfiasNZzjK8jZgSdmeFr5hEm7OzMyk

