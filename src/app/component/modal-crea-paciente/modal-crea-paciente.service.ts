import { Injectable, EventEmitter} from '@angular/core';
import { PacienteService } from '../../services/service.index';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class ModalCreaPacienteService {
  
  public oculto: string='oculto';
  public notificacionCargarPacientes = new EventEmitter<any>();

  constructor(
  	public _pacienteService: PacienteService,
  ) { }

  ocultarModal(){
  	this.oculto = 'oculto';
  }

  mostrarModal(){
  	this.oculto = '';
  }

  guardarPaciente(paciente:any){
  	//console.log(paciente.name);
  	let nuevoPaciente = new Paciente(
      paciente.rut,
  	  paciente.name,
      paciente.fechaNacimiento,
      paciente.establecimiento,
      paciente.nivel,
      paciente.direccion,
      paciente.fijo,
      paciente.celular,
	  paciente.email,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
	);
	//console.log(paciente.observaciones);
   this._pacienteService.crearPaciente(nuevoPaciente)
   				.subscribe(resp => this.notificacionCargarPacientes.emit(true));
  }
}
