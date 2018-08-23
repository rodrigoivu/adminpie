import { Component, OnInit } from '@angular/core';
import { Pesquisa } from '../../models/pesquisa.model';
import { PesquisaService } from '../../services/service.index';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styles: []
})
export class PostulacionComponent implements OnInit {
  archivoSubir: File;
  pesquisa: Pesquisa;
  pesquisas: Pesquisa[]=[];

  pesquisaArchivo: string=null;

  pesquisaSubidoPor:string=null;

  periodoActual:number;

  //Datos de usuario Actual
  usuario:any;
  role:string;
  _idUsuario: string;
  nombreUsuario: string;

  constructor(
  	public _pesquisaService: PesquisaService,	
  ) {
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
    this._idUsuario = this.usuario._id;
    this.nombreUsuario = this.usuario.name;
    this.role = this.usuario.role;

    this._pesquisaService.notificacionActualizado
          .subscribe( resp => {
            this.cargarPesquisas();
    } ); 
  }

  ngOnInit() {
  	let my = new Date();
    this.periodoActual = my.getFullYear();
  	this.cargarPesquisas();

  }

  cargarPesquisas(){
  	this._pesquisaService.cargarPesquisas()
  		.subscribe((resp:any) =>{
  			this.pesquisas =resp.pesquisas;
  		});
  }

  crearPesquisa(){
  	let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number =my.getFullYear();
    let fechaHoy:string =  dia+'-'+  mes + '-'+ ano;

  	let nuevaPesquisa = new Pesquisa(
  			ano,
  			null,
  			fechaHoy,
  			this.nombreUsuario
  		);
  	this._pesquisaService.crearPesquisa(nuevaPesquisa)
  		.subscribe((resp:any) =>{
  			this.pesquisa =resp;
  			this.cargarPesquisas();
  		});
  	
  }

  seleccionaArchivo( archivo: File, valor:number ){

  	if(!archivo){
  		this.archivoSubir = null;
      	return;
  	}

  	if( archivo.type.indexOf('sheet') < 0  ){
  		swal('Sólo XLS', 'El archivo seleccionado no es un XLS', 'error');
  		this.archivoSubir = null;
  		return;
  	}
  		this.archivoSubir = archivo;

  }

  guardarArchivo(pesquisaId: string){

     this._pesquisaService.guardarArchivo( this.archivoSubir, pesquisaId,this.nombreUsuario);
   
  	
  }

}
