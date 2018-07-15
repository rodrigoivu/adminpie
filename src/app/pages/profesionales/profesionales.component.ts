import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalService } from '../../services/service.index';

import { ModalDiaProfesionalService } from '../../component/modal-dia-profesional/modal-dia-profesional.service';
import { ModalSemanaProfesionalService } from '../../component/modal-semana-profesional/modal-semana-profesional.service';
import { ModalEditProfesionalService } from '../../component/modal-edit-profesional/modal-edit-profesional.service';
import { ModalReservaService } from '../../component/modal-reserva/modal-reserva.service';

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
  	public _profesionalService: ProfesionalService,
    public _modalDiaProfesionalService: ModalDiaProfesionalService,
    public _modalSemanaProfesionalService: ModalSemanaProfesionalService,
    public _modalEditProfesionalService: ModalEditProfesionalService,
    public _modalReservaService: ModalReservaService
  ) {}

  ngAfterViewInit() {}
  
  ngOnInit() {
  	this.cargarProfesionales();
  }

  buscarUsuario( termino: string){}
  
  reserva(id: string, nombre: string, profesion:string){
     this._modalReservaService.mostrarModal(id, nombre, profesion);
  }

  editarDia(id: string, nombre: string, profesion:string){
    this._modalDiaProfesionalService.mostrarModal(id, nombre, profesion);

  }
  editarSemana(id: string, nombre: string, profesion:string){
    this._modalSemanaProfesionalService.mostrarModal(id, nombre, profesion);
  }
  editarProfesional(id: string, nombre: string, profesion:string){
    this._modalEditProfesionalService.mostrarModal(id, nombre, profesion);
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
  	this.cargarProfesionales();

  }
  cargarProfesionales(){
  	this.cargando =true;
  	this._profesionalService.cargarProfesionales(this.desde)
  			.subscribe( (resp: any) =>{
  	           
          //console.log('respuesta',resp.total);
  				this.totalRegistros = resp.total;
  				this.profesionales = resp.profesionales;
  				this.cargando = false;

  			});

  }
}
