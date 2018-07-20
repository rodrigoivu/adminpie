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
  		paciente.name,
		  paciente.email,
      paciente.rut,
  		paciente.direccion,
  		paciente.fijo,
  		paciente.celular,
  		paciente.padre,
  		paciente.madre,
  		paciente.nacimiento,
  		paciente.comuna,
  		paciente.observaciones
	);
	//console.log(paciente.observaciones);
   this._pacienteService.crearPaciente(nuevoPaciente)
   				.subscribe(resp => this.notificacionCargarPacientes.emit(true));
  }
}
