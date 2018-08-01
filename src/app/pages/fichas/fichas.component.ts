import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styles: []
})
export class FichasComponent implements OnInit {
  nombrePaciente:string ='';
  rutPaciente: string='';
  emailPaciente: string='';
  telefonoPaciente: string='';

  constructor(
  		 public _pacienteService: PacienteService,
  	) { 
  	
  }

  ngOnInit() {
  	this.nombrePaciente = this._pacienteService.nombrePaciente;
  	this.rutPaciente = this._pacienteService.rutPaciente;
  	this.emailPaciente = this._pacienteService.emailPaciente;
  	this.telefonoPaciente = this._pacienteService.telefonoPaciente;
  }


  iniciarDatos(){
  	
  
  }

}
