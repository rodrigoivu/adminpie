import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
	constructor(
		public _usuarioService: UsuarioService,
		public router: Router
	){	}
  canActivate() : Promise<boolean> | boolean {
  	//console.log('Token Guard');
  	let token = this._usuarioService.token;
  	let payload = JSON.parse( atob( token.split('.')[1] ));
  	let expirado = this.expirado( payload.exp );

  	if ( expirado ){
  		this.router.navigate(['/authentication/login']);
  		return false;
  	}
  	
    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number  ): Promise<boolean>{

  	return new Promise( (resolve, reject) =>{
  		let tokenExp = new Date( fechaExp *1000); //el payload.exp esta en seg, y Date se guarda en milisegundos
  		let ahora = new Date();

  		ahora.setTime( ahora.getTime() + ( 1*60*60*1000) );// el 15 o primer numero son las horas // esto es ahora mas 15 horas

  		if ( tokenExp.getTime() > ahora.getTime() ){
  			resolve(true);
  		}else{
  			this._usuarioService.renuevaToken()
  					.subscribe(()=>
  					   {
  					    	resolve(true);
  					   },
  						() => {
  							reject(false);
  							this.router.navigate(['/authentication/login']);
  						}
  					);
  		}
  	});

  }

  expirado ( fechaExp: number ){
  	let ahora = new Date().getTime() / 1000;

  	if( fechaExp < ahora){
  		return true;
  	}else{
  		return false;
  	}
  }
}
