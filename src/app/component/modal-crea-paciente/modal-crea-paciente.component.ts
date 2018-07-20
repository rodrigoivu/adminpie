import { Component, OnInit } from '@angular/core';
import { ModalCreaPacienteService } from './modal-crea-paciente.service';
import { NgbDateStruct,NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
      
      this.forma = this.fb.group({
      	     name: new FormControl(null, Validators.required),
			 email:new FormControl(null, Validators.email),
			 rut:'',
			 direccion:'',
			 fijo:'',
			 celular:'',
			 padre:'',
			 madre:'',
			 nacimiento:'',
			 comuna:'',
			 observaciones:''
      	  //material_id: new FormControl({ value: x.id, disabled: true }, Validators.required),	
          //horaSemana: this.fb.array([])
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
