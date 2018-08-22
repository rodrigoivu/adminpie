import { Component, OnInit } from '@angular/core';
import { ModalCreaPacienteService } from './modal-crea-paciente.service';
import { NgbDateStruct,NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface NgbDate {
  day: number,
  month: number,
  year: number
}

@Component({
  selector: 'app-modal-crea-paciente',
  templateUrl: './modal-crea-paciente.component.html',
  styles: []
})
export class ModalCreaPacienteComponent implements OnInit {
  model: NgbDateStruct; // para fecha de cumpleaños
  forma: FormGroup;

  constructor(
  	private fb: FormBuilder,
  	public _modalCreaPacienteService: ModalCreaPacienteService
  ) { 

  	this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
      let fecha: NgbDate={
        day: null,
        month: null ,
        year: null,
      }
      this.forma = this.fb.group({
             rut: new FormControl(null, Validators.required),
      	     name: new FormControl(null, Validators.required),
             fechaNacimiento:fecha ,
             establecimiento: null,
             nivel: null,
             direccion: null,
             fijo: null,
             celular: null,
      		 email: new FormControl(null, Validators.email),

      });
     
  }

  cerrarModal(){
  	this._modalCreaPacienteService.ocultarModal();
  }

  btnGuardar(){
    this._modalCreaPacienteService.guardarPaciente(this.forma.value);
  	//console.log(this.forma.value);
    this._modalCreaPacienteService.ocultarModal();
  }

}
