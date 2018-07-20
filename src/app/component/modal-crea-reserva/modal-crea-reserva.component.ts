import { Component, OnInit } from '@angular/core';
import { ModalReservaService } from '../modal-reserva/modal-reserva.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-crea-reserva',
  templateUrl: './modal-crea-reserva.component.html',
  styles: []
})
export class ModalCreaReservaComponent implements OnInit {
  forma: FormGroup;


  constructor(
  	private fb: FormBuilder,
  	public _modalReservaService: ModalReservaService
  ) {

  	 this._modalReservaService.notificacionCreaReserva
          .subscribe( resp => {
            
          } ); 	
     this.createForm();

  }

  ngOnInit() {
  }

  createForm() {
      
      this.forma = this.fb.group({
          dia:'',
          hora:''
      });
     
  }

  cerrarModal(){

  	this._modalReservaService.ocultarModalCreaReserva();
  }

  btnGuardar(){

  }

}
