import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';
import { ModalCreaPacienteService } from '../../component/modal-crea-paciente/modal-crea-paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements AfterViewInit, OnInit {
  pacientes: Paciente[]=[];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  terminoBuscar:string ='';

  constructor(
    public _pacienteService: PacienteService,
    public _modalCreaPacienteService: ModalCreaPacienteService
  ) {
   this._modalCreaPacienteService.notificacionCargarPacientes
          .subscribe( resp => {
            this.cargarPacientes();
          } ); 
  }

  ngAfterViewInit() {
  }
  ngOnInit(){
   this.cargarPacientes();
  }

  cargarPacientes(){
    this.cargando =true;
    this._pacienteService.cargarPacientes(this.desde)
        .subscribe( (resp: any) =>{
               
          this.totalRegistros = resp.total;
          this.pacientes = resp.pacientes;
          this.cargando = false;

     });

  }
  crearPaciente(){
    this._modalCreaPacienteService.mostrarModal();
  }
  buscarPaciente( termino: string){

  }

  editarPaciente( paciente: Paciente){

  }

  borrarPaciente( paciente: Paciente){
    
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
    this.cargarPacientes();

  }

}
