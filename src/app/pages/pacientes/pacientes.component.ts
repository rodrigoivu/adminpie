import { Component, AfterViewInit, OnInit } from '@angular/core';
//import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../models/paciente.model';
import { Reserva } from '../../models/reserva.model';
import { PacienteService, ReservaService, ProfesionalService } from '../../services/service.index';
import { ModalCreaPacienteService } from '../../component/modal-crea-paciente/modal-crea-paciente.service';

interface pacienteDataReserva{
  paciente: Paciente,
  hora: string,
  idhora:number,   //para ordenar
  edad: number
}

interface itemHora{
  id: number,
  tramoHora: string
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements AfterViewInit, OnInit {
  pacientes: Paciente[]=[];
  pacienteDataReserva: pacienteDataReserva[]=[];
  itemsReservas: Reserva[]=[];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  terminoBuscar:string ='';
  opcionMuestra:number=0; //0: Mostrar Todos  1:MostrarHoy
  mensajeSuperior:string='';

  //Datos de usuario Actual
  usuario:any;
  role:string;
  _idUsuario: string;
  nombreUsr: string;
  profesion: string;

  fechaHoy:string;


  constructor(
    public _pacienteService: PacienteService,
    public _profesionalService: ProfesionalService,
    public _reservaService: ReservaService,
    public _modalCreaPacienteService: ModalCreaPacienteService
  ) {

   //Buscar Usuario Actual
   this.usuario=JSON.parse(localStorage.getItem('usuario'));
   this._idUsuario = this.usuario._id;
   this.role = this.usuario.role;
   this.nombreUsr = this.usuario.name;

   //BUSCA PROFESON DE PROFESIONAL
    this._profesionalService.buscarProfesional(this._idUsuario)
          .subscribe((resp:any) =>{
            if (resp){
              this.profesion=resp.profesion;
            }else{
              this.profesion='';
            }
 
    });

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
    this.mensajeSuperior='';
    this.opcionMuestra=0;
    this.cargando =true;
    this._pacienteService.cargarPacientes(this.desde)
        .subscribe( (resp: any) =>{
               
          this.totalRegistros = resp.total;
          this.pacientes = resp.pacientes;
          this.cargarPacienteDataReserva();
          this.cargando = false;
          

     });

  }

  cargarPacienteDataReserva(){
    this.pacienteDataReserva=[];
    let pacDataReserva: pacienteDataReserva;
    
    for(let pac of this.pacientes){
        let edad = this.calculateAge(pac.fechaNacimiento);
        pacDataReserva={
              paciente: pac,
              hora: null,
              idhora:null,
              edad: edad
        };
        this.pacienteDataReserva.push(pacDataReserva);
    }      

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
          this.cargarPacienteDataReserva();
          this.cargando = false;
        });
  }

  mostrarPacientesHoy(){
    this.opcionMuestra=1;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number =my.getFullYear();
    let numeroDia: number = my.getDay();
    this.fechaHoy =  dia+'-'+  mes + '-'+ ano;

    this._reservaService.getReservaPorFechaPorUsuario(this._idUsuario, this.fechaHoy, numeroDia)
      .subscribe((resp: any) =>{
         this.itemsReservas = resp.reservas;
        // this.notificacion.emit(true);
         this.analizarReservas();
      });

  }

  analizarReservas(){
    let my: Date = new Date();
    let anoActual= my.getFullYear();
    let diaHoy:Date= new Date(my.getFullYear(),my.getMonth(), my.getDate()); //para que no cuente los milisegundos
    let i:number=0;
    this.pacientes = [];
    
    this.cargando =true;

    this.pacienteDataReserva=[];

    for(let res of this.itemsReservas){

      let reservaFecha=res.fecha;
      let diaSplit: string[]= reservaFecha.split('-'); 
      let diaReserva: Date= new Date(parseInt(diaSplit[2]),parseInt(diaSplit[1])-1, parseInt(diaSplit[0]) );
      
      //Para no incluir las reservas posteriores y que tengan el dia repetido

      if (diaReserva <= diaHoy ){
         if(anoActual == res.repiteAno){
           let pacienteId=res.paciente._id
           this._pacienteService.buscarPaciente(pacienteId)
                 .subscribe((resp: any) =>{
                   let pacDataReserva: pacienteDataReserva;
                   let itemHora: itemHora=this.indicaHora(res.horaReservado,res.poshora);
                   let edad = this.calculateAge(resp.paciente.fechaNacimiento);
                   pacDataReserva={
                          paciente: resp.paciente,
                          hora: itemHora.tramoHora,
                          idhora:itemHora.id,
                          edad:edad                    };
                    this.pacienteDataReserva.push(pacDataReserva);
                    this.ordenarDataReserva();
                    i++;
                    this.mensajeSuperior=this.nombreUsr+ ' ( '+ this.profesion+' )' +' tiene '+i+ ' Pacientes para hoy';
                 
              });
         }
      }



    }
     this.cargando =false;
    //Aqui no hay que escribir codigo que dependa del suscribe dentro del for
      
  }

  ordenarDataReserva(){
   this.pacienteDataReserva.sort( (a, b) => {  
        if (a.idhora > b.idhora) {
          return 1;
        }
        if (a.idhora < b.idhora) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
  }

  mostrarPacientesTodos(){
    this.cargarPacientes();
  }

  // editarPaciente( paciente: Paciente){

  // }

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

  calculateAge(birthday: string) {
    let birthday_arr: string[] = birthday.split('-');
    var birthday_date:Date = new Date(parseInt(birthday_arr[2]), parseInt(birthday_arr[1]) - 1, parseInt(birthday_arr[0]));
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  indicaHora(hora: number, pos: any[]): itemHora{
    let flgIni: boolean = true;
    let posIni: number=0;
    let posTot: number=0;
    let Hora=hora+7;
    let tramoHora: string='';
    let idTramoHora: string='';
    let itemHora: itemHora;

    for  ( var i=0; i<=5 ; i++ ){
      if(pos[i].pos==1){
        if(flgIni){
          posIni=i;
          flgIni=false;
        }
        posTot++;
      }
    }
    if( posIni == 0 ){
      if(posTot == 6){
        let newHora = Hora+1
        tramoHora = Hora+':00' + ' - ' + newHora+':00';
      }else{
        tramoHora = Hora+':00' + ' - ' + Hora+':'+posTot*10;
      }
      
      idTramoHora = Hora+'00';
      itemHora={
        id: parseInt(idTramoHora) ,
        tramoHora: tramoHora
      }
    }else{
      let posFin: number = posIni+posTot;
      if(posFin == 6){
          let newHora = Hora+1
          tramoHora = Hora+':'+posIni*10 + ' - ' + newHora+':00';
          idTramoHora = Hora+''+posIni*10+'';
          itemHora={
            id:parseInt(idTramoHora),
            tramoHora: tramoHora
          }
      }else{
          tramoHora = Hora+':'+posIni*10 + ' - ' + Hora+':'+posFin*10;
          idTramoHora = Hora+''+posIni*10+'';
          itemHora={
            id:parseInt(idTramoHora),
            tramoHora: tramoHora
          }
      }
      
    }
    
    return itemHora;

  }

}
