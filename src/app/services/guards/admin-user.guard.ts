import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AdminUserGuard implements CanActivate {

  constructor( 
  	public _usuarioService: UsuarioService
  ){

  }

  canActivate(){
  	if ( this._usuarioService.usuario.role === 'ADMIN_ROLE' || this._usuarioService.usuario.role === 'USER_ROLE'){
  		return true;
  	}else{
      	this._usuarioService.logout();
  		return false;
  	}
   }
}