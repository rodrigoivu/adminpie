import { Component, AfterViewInit, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsuarioService, ProfesionalService } from '../../services/service.index';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-crearusuarios',
  templateUrl: './crearusuarios.component.html',
  styles: []
})
export class CrearusuariosComponent implements AfterViewInit, OnInit {
  usuarios: User[]=[];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  terminoBuscar:string ='';

  constructor(
  		public _usuarioService: UsuarioService,
      public _profesionalService: ProfesionalService,
      public _modalUploadService: ModalUploadService
  	) {
    
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.cargarUsuarios();
            this.cargarImagenUsuarioActual( resp.user,resp.image);
          } );
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
  	this.cargando =true;
  	this._usuarioService.cargarUsuarios(this.desde)
  			.subscribe( (resp: any) =>{
  	           
  				this.totalRegistros = resp.total;
  				this.usuarios = resp.users;
  				this.cargando = false;

  			});

  }

  cargarImagenUsuarioActual(usuario: User, image: string){
    if( usuario._id === this._usuarioService.usuario._id ){
      this._usuarioService.usuario.image=image;
    }
  }

  cambiarDesde( valor: number ){

  	let desde = this.desde + valor;

  	if ( desde >= this.totalRegistros ){
  		return;
  	}

  	if ( desde < 0 ){
  		return;
  	}

  	this.desde += valor;
  	this.cargarUsuarios();

  }

  buscarUsuario( termino: string){
    this.terminoBuscar=termino;
  	if ( termino.length <= 0){
  		this.cargarUsuarios();
  		return;
  	}
  	this.cargando = true;
  	this._usuarioService.buscarUsuarios ( termino )
  			.subscribe( ( usuarios: User[]) => {
  				this.usuarios = usuarios;
  				this.cargando = false;
  			});

  }
  borrarUsuario( usuario: User ){
    
  	if( usuario._id === this._usuarioService.usuario._id ){
  		swal('No se puede borrar usuario','No se puede borrar a si mismo', 'error');
  		return;
  	}

  	swal({
		  title: '¿ Está seguro ?',
		  text: 'Está a punto de borrar a ' + usuario.name,
		  icon: 'warning',
		  buttons: true,
		  dangerMode: true,
		})
		.then(borrar => {

		  if (borrar) {
		  	this._usuarioService.borrarUsuario( usuario._id )
		  			.subscribe( (borrado: any) => {
		  				console.log( borrado );
              this.borrarProfesional(usuario);
		  				this.cargarUsuarios();	
		  			});
		  } 
		});

	}
	guardarUsuario( usuario: User){
		if( usuario._id === this._usuarioService.usuario._id ){
        this.buscarUsuario( this.terminoBuscar);
	  		swal('Ud. es Administrador','No se puede cambiar el rol', 'error');
	  		return;
  		}
  		this._usuarioService.actualizarUsuario(usuario)
  				.subscribe( (resp: any) =>{
             this.creaProfesional( resp);
          });
	
	}

  creaProfesional( usuario:User){
    
    if ( usuario.role === 'PROFESIONAL_ROLE'){
      
      this._profesionalService.crearProfesional(usuario._id)
            .subscribe();
    }else{
      this._profesionalService.borrarProfesional(usuario._id)
            .subscribe();
    }
  }

  borrarProfesional(usuario:User){

       this._profesionalService.borrarProfesional(usuario._id)
            .subscribe(()=>{
             // this.cargarUsuarios();  
       });
  }

}


