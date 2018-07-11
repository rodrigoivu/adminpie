import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  
  usuario: User;
  usuariogoogle=false; //hay que incorporar usuario.google en el modelo user y en bd si es que se usa la ocion de logearse con google
  
  imagenSubir: File;
  imagenTemp: string;


  constructor(
  	public _usuarioService: UsuarioService

  ) { 
  		this.usuario = this._usuarioService.usuario; // Recupera datos para ser mostrados
  }

  ngOnInit() {
  		
  }

  guardar ( usuario: User ){  // datos modificados en el formulario
  	this.usuario.name = usuario.name;
  	if(!this.usuariogoogle){
  		this.usuario.email = usuario.email;
  	}
  	

  	this._usuarioService.actualizarUsuario ( this.usuario )
  				.subscribe();
  }

  seleccionImage( archivo: File ){

  	if(!archivo){
  		this.imagenSubir = null;
  		return;
  	}
  	if( archivo.type.indexOf('image') < 0 ){
  		swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
  		this.imagenSubir = null;
  		return;
  	}

  	this.imagenSubir = archivo;

  	let reader = new FileReader();
  	let urlImagenTemp = reader.readAsDataURL(archivo);

  	reader.onloadend =() => this.imagenTemp = reader.result;

  }

  cambiarImagen(){
  	this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id)
  }

}
