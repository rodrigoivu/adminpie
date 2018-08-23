import { Injectable, EventEmitter} from '@angular/core';
import { PacienteService } from '../../services/service.index';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class ModalCreaPacienteService {
  
  public oculto: string='oculto';
  public notificacionCargarPacientes = new EventEmitter<any>();
  public pacienteSeleccionado:Paciente;
  public notificacionEditaCreaPaciente = new EventEmitter<any>();
  //archivoSubir: File;

  //PROTOCOLOS
  autorizacionSalida: string=null;
  autorizacionTransporte:string=null;
  //PROTOCOLOS SUBIDO POR
  protocolo1SubidoPor:string=null;
  protocolo2SubidoPor:string=null;

  //Datos de usuario Actual
  usuario:any;
  role:string;
  _idUsuario: string;
  nombreUsuario: string;

  _idPaciente: string;

  constructor(
  	public _pacienteService: PacienteService,
  ) {

    this._pacienteService.notificacionActualizado
          .subscribe( resp => {
            this.cargaPaciente();
    } ); 

  }

  ocultarModal(){
  	this.oculto = 'oculto';
    
  }


  cargaPaciente(){
    this._pacienteService.buscarPaciente(this._idPaciente)
      .subscribe( (resp: any) => {

          if( resp.paciente ){
            this.pacienteSeleccionado = resp.paciente;
            this.autorizacionSalida = this.pacienteSeleccionado.autorizacionSalida;
            this.autorizacionTransporte= this.pacienteSeleccionado.autorizacionTransporte;
           
            this.protocolo1SubidoPor = this.pacienteSeleccionado.protocolo1SubidoPor;
            this.protocolo2SubidoPor = this.pacienteSeleccionado.protocolo2SubidoPor;

            this.notificacionEditaCreaPaciente.emit(true);
          }
        });
  }

  mostrarModal(paciente:Paciente){
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
    this._idUsuario = this.usuario._id;
    this.nombreUsuario = this.usuario.name;
    this.role = this.usuario.role;

    this.pacienteSeleccionado = paciente;


  	this.oculto = '';

    if(!paciente){
        this.notificacionEditaCreaPaciente.emit(false);
    }else{
        this.autorizacionSalida = paciente.autorizacionSalida;
        this.autorizacionTransporte = paciente.autorizacionTransporte;
        this.protocolo1SubidoPor = paciente.protocolo1SubidoPor;
        this.protocolo2SubidoPor = paciente.protocolo2SubidoPor;
        this.notificacionEditaCreaPaciente.emit(true);
        this._idPaciente = paciente._id;
    }
    
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

  actualizaPaciente(paciente:any){
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
      paciente.email
      
  );


  //console.log(paciente.observaciones);
   this._pacienteService.actualizaPaciente(nuevoPaciente,this.pacienteSeleccionado._id)
           .subscribe(resp => this.notificacionCargarPacientes.emit(true));
  }

  guardarArchivo(itemArchivo:string, archivoSubir:File){
    this._pacienteService.guardarArchivo( archivoSubir, this.pacienteSeleccionado._id,itemArchivo,this.nombreUsuario);
  }

}
