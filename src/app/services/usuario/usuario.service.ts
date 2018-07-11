 import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { RouteInfo } from '../../shared/sidebar/sidebar.metadata';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: User;
  token: string;
  ROUTES: any[]=[]; //esto es el menu del sidebar

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ){ 
  	this.cargarStorage();
  }

  renuevaToken(){
    let url = URL_SERVICIOS + 'api/renuevaToken/' + '?token=' + this.token;

    return this.http.get( url )
             .pipe(
                  map( (resp: any) => {
                      this.token = resp.token;
                      localStorage.setItem('token', this.token );
                      //console.log('Token renovado');
                      return true;
                  }),
                  catchError ( err => {
                    this.router.navigate(['/authentication/login']);
                    swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error');
                    return throwError( err );
                    
                  })
              );

  }

  estaLogueado(){
    return ( this.token.length > 5 )? true : false;
  }

  cargarStorage(){
    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.ROUTES = JSON.parse( localStorage.getItem('ROUTES'));  //esto es el menu del sidebar
    }else{
      this.token = '';
      this.usuario = null;
      this.ROUTES = [];
    }
  }

  //GUARDAR STORAGE
  guardarStorage( id: string, token: string, usuario: User, ROUTES: any){
      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('usuario', JSON.stringify(usuario) );
      localStorage.setItem('ROUTES', JSON.stringify(ROUTES) ); //esto es el menu del sidebar

      this.usuario = usuario;
      this.token = token;
      this.ROUTES = ROUTES;
  }

  //LOGOUT
  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/authentication/login']);

  }
  
  //SERVICIO LOGIN
  login( usuario: User, recordar: boolean = false, gethash = null ){

  	if( recordar ){
  		localStorage.setItem('email', usuario.email );
  	}else{
  		localStorage.removeItem('email');
  	}

    if(gethash != null){
    	(usuario as any).gethash=gethash; // de esta forma agregamos otro item a la variable usuario de tipo User
    }
  	let url = URL_SERVICIOS + 'api/login';
  	return this.http.post( url, usuario )
          .pipe(
      				map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.user, resp.ROUTES);
      					return true; //se puede retornar cualquier cosa si no se pone no llega nada como respuesta a la funcion que lo llama
      				}),
              catchError( err => {
                swal( 'Error en el login', err.error.message, 'error');
                return throwError( err );
              })
          );
          
  }

  //SERVICIO CREAR USUARIO
  crearUsuario( usuario: User ){
  	let url = URL_SERVICIOS + 'api/register';
  	return  this.http.post( url, usuario )
          .pipe(
      				map( (resp: any) => {

      					swal('Usuario creado', usuario.email, 'success');
      					return resp.user;

      				}),
              catchError( err => {
                swal( err.error.message, err.error.error.message, 'error');
                return throwError( err );
              })
          );

  }

  actualizarUsuario( usuario: User ){

    let url = URL_SERVICIOS + 'api/update-user/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url,usuario )
                .map( (resp: any) =>{
                  if ( usuario._id === this.usuario._id){  // esta función se llama desde el perfil donde es el mismo usuario y se guarda en el storage. Y se llama de la lista de usuarios en mantenimiento, donde el mismo usuario no deberia entrar
                    let usuarioDB: User = resp.user;
                    this.guardarStorage ( usuarioDB._id, this.token, usuarioDB, this.ROUTES);
                  }
                  
                  swal('Usuario actualizado', usuario.name, 'success' );
                  return resp.user;
                });
  }

  cambiarImagen( archivo: File, id: string ){
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id, this.token )
          .then ( (resp: any) =>{
            this.usuario.image = resp.image;
            swal('Archivo cargado',this.usuario.name, 'success');

            this.guardarStorage(id, this.token, this.usuario, this.ROUTES);
          })
          .catch( resp =>{
            console.log ( resp );
          })
  }

  cargarUsuarios( desde: number = 0 ){
    let url = URL_SERVICIOS + 'api/users' + '?token=' + this.token + '&desde='+ desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ){
    let url = URL_SERVICIOS + 'api/busqueda/users/'+termino+ '?token=' + this.token;

    return this.http.get( url )
                .map((resp: any) => resp.users );
  }

  borrarUsuario( id: string ){
    let url = URL_SERVICIOS + 'api/remove-user/'+ id + '?token=' + this.token;

    return this.http.delete( url )
                  .map( resp => {
                      swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                      return true;
                  });
  }

}
