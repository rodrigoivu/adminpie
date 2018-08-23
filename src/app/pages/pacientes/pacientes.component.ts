import { Component, AfterViewInit, OnInit } from '@angular/core';
//import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
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
          .subscribe( (resp,err) => {
            if(err){
              console.log('error'+err);
              this.cargando = false;
            }else{
              this.cargarPacientes();
            }
            
            
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
  crearEditarPaciente(paciente:Paciente){

    this._modalCreaPacienteService.mostrarModal(paciente);
  }
  buscarPaciente( termino: string){
    this.terminoBuscar=termino;
    if ( termino.length <= 0){
      this.cargarPacientes();
      return;
    }
    this.cargando = true;
    this._pacienteService.buscarPacientes ( termino )
        .subscribe( ( pacientes: Paciente[]) => {
          this.pacientes  = pacientes;
          this.cargando = false;
        });
  }

  editarPaciente( paciente: Paciente){

  }

  borrarPaciente( paciente: Paciente){
    
  }

  fichasPaciente( paciente: Paciente ){
    this._pacienteService.verFichasPaciente(paciente);
  }

  adjuntosPaciente( paciente: Paciente ){
    this._pacienteService.verAdjuntosPaciente(paciente);
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
