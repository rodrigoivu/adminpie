import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalService } from '../../services/service.index';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styles: []
})
export class ProfesionalesComponent implements AfterViewInit, OnInit {
  profesionales: Profesional[]=[];
  desde: number = 0;
  cargando: boolean = true;
  totalRegistros: number = 0;
  terminoBuscar:string ='';

  constructor(
  	public _profesionalService: ProfesionalService
  ) {
    
  }

  ngAfterViewInit() {}
  ngOnInit() {
  	this.cargarProfesionales();
  }
  buscarUsuario( termino: string){}
  editarDia(profesional: Profesional){}
  editarSemana(profesional: Profesional){}
  cambiarDesde( valor: number ){

  	let desde = this.desde + valor;

  	if ( desde >= this.totalRegistros ){
  		return;
  	}

  	if ( desde < 0 ){
  		return;
  	}

  	this.desde += valor;
  	this.cargarProfesionales();

  }
  cargarProfesionales(){
  	this.cargando =true;
  	this._profesionalService.cargarProfesionales(this.desde)
  			.subscribe( (resp: any) =>{
  	           
               console.log('respuesta',resp.total);
  				this.totalRegistros = resp.total;
  				this.profesionales = resp.profesionales;
  				this.cargando = false;

  			});

  }
}
