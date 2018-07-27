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
  ) { }

  ngOnInit() {
  }

  cerrarModal(){
  	this._modalEditProfesionalService.ocultarModal();
  }
  btnGuardar(){

  }
}
