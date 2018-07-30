import { Component, OnInit } from '@angular/core';
import { ModalEditProfesionalService } from './modal-edit-profesional.service';

@Component({
  selector: 'app-modal-edit-profesional',
  templateUrl: './modal-edit-profesional.component.html',
  styles: []
})
export class ModalEditProfesionalComponent implements OnInit {
  tipoProfesion: string ='prof2';
  constructor(
  	public _modalEditProfesionalService: ModalEditProfesionalService
  ) { 
      this._modalEditProfesionalService.notificacion
          .subscribe( resp => {
            this.iniciaDatos();
          } ); 

  }

  ngOnInit() {
  }

  iniciaDatos(){
    this.tipoProfesion = this._modalEditProfesionalService.profesion;
  }
  cerrarModal(){
  	this._modalEditProfesionalService.ocultarModal();
  }
  btnGuardar(){
    //console.log('Profesion: '+this.tipoProfesion);
    this._modalEditProfesionalService.actualizaProfesional(this.tipoProfesion);
    this.cerrarModal();
  }
}
