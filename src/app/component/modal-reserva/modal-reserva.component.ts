import { Component, OnInit } from '@angular/core';
import { ModalReservaService } from './modal-reserva.service';
import { NgbDateStruct,  NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

interface DiaponibleProfesional{ // de la base de datos
  horaDisp: number
  horaDispMuestra: number
};

interface PosHora{ // de la base de datos
    pos: number
};

interface ItemReservado {  //de la base de datos
  nombrePaciente: string,
  nombreEstablecimiento: string,
  horaReservado: number,
  poshora: PosHora[]
};

interface PacienteReservado{
  nombrePaciente: string,
  nombreEstablecimiento: string,
  horaReservado: string,
  minReservado: string,
  btnReserva: boolean,
  posEnLista: number,
  poshora: PosHora[]
}

interface ListaReservadoTotal{
  horaDisponible: number,
  pacientesPorHoraDisponible: PacienteReservado[]
}

const my = new Date();

@Component({
  selector: 'app-modal-reserva',
  templateUrl: './modal-reserva.component.html',
  styles: []
})
export class ModalReservaComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number; month: number };
  stringDate: string;

  //Visualización Calendario
  displayMonths = 1;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';

  public itemsReservado : ItemReservado[]=[];
  public horasDispProf : DiaponibleProfesional[]=[];
  public listaReservadoTotal: ListaReservadoTotal[]=[];
  //public pacientesReservados: PacienteReservado[]=[];

  item_hora: string="item_hora";
  item_hora_ultimo: string="item_hora_ultimo";

  constructor(
  	public _modalReservaService: ModalReservaService
  ) { }

  ngOnInit() {
  	this.selectToday();
    this.generaItemsReservado();
    this.generaHorasDispProf();
    this.generaMuestraReservados();
  }
  
  generaHorasDispProf(){
    this.horasDispProf = [];
    let horaDispP: DiaponibleProfesional;
    for (var i = 1; i <= 4; i++) {
      horaDispP={
        horaDisp: i,
        horaDispMuestra: 7+i
      }
      this.horasDispProf.push(horaDispP);
    }
    //console.log(this.horasDispProf);
  }

  generaItemsReservado(){
    this.itemsReservado = [];
    let itemR: ItemReservado;
    for (var i = 1; i <= 4; i++) {
      itemR={
          nombrePaciente: 'Paciente'+i,
          nombreEstablecimiento: 'Establecimiento'+i,
          horaReservado: i,
          poshora: [{pos:0},{pos:0},{pos:1},{pos:1},{pos:1},{pos:0}]
      };
    this.itemsReservado.push(itemR);
    }

    //console.log(this.itemsReservado);
  }

  generaMuestraReservados(){

    this.listaReservadoTotal=[];
    
    let pacienteReservado: PacienteReservado;
    let pacientesReservados: PacienteReservado[]=[];
    let pacientesReservadosTransformados: PacienteReservado[]=[];
    let itemReservadoTotal: ListaReservadoTotal;

    for ( let horaDispP of this.horasDispProf){ // recorre las horas disponibles de profesional
      for ( let itemR of this.itemsReservado){  // recorre los pacientes reservados en ese dia con ese profesional
        
        if(horaDispP.horaDisp == itemR.horaReservado){  // si la hora coincide
            

            let min: number=0;
            let flagIni:boolean= false;
            let iniMin: number=0;
            let i: number=0;
            let minPaciente: number=0;
            let horaPaciente: number=0;
            let horaPacienteString: string='';

            for( let posH of itemR.poshora){ // minutos 
              if(!flagIni && posH.pos==1){
                iniMin=i;
                flagIni=true;
              }
              i++;
              min = min + 10*posH.pos;
            }
            

            minPaciente=iniMin*10;
            horaPaciente=itemR.horaReservado+7;
            horaPacienteString=horaPaciente+':'+minPaciente;

            pacienteReservado={
                nombrePaciente: itemR.nombrePaciente,
                nombreEstablecimiento: itemR.nombreEstablecimiento,
                horaReservado: horaPacienteString,
                minReservado: min+'min',
                btnReserva: false,
                posEnLista:iniMin,
                poshora: itemR.poshora
            };
            pacientesReservados.push(pacienteReservado);
        }
      }

      pacientesReservadosTransformados= this.transformaPacientesPorHoraDisponible(pacientesReservados);

      itemReservadoTotal={
        horaDisponible: horaDispP.horaDisp+7,
        pacientesPorHoraDisponible: pacientesReservadosTransformados
      }

      this.listaReservadoTotal.push(itemReservadoTotal);
      pacientesReservados=[];
      pacientesReservadosTransformados=[];

    }
      //console.log(this.listaReservadoTotal);
  }
  
  transformaPacientesPorHoraDisponible(items: PacienteReservado[]){
    let itemNuevo: PacienteReservado;
    let itemsT: PacienteReservado[]=[];
    let flagNuevo: boolean=true;
    let poshoraActual: PosHora[]=[];
    let poshoraA: PosHora;

    // Aqui se debe ordenar por posEn Lista
    
    //Crear Estado de posiciones
    for  ( var i=0; i<=5 ; i++ ){
        poshoraA = { pos: 0 };
        for( let pacHoraDisp of items ){
            if ( pacHoraDisp.poshora[i].pos == 1 ){
              poshoraA={ pos: 1 };
              
        }
    }
       poshoraActual.push(poshoraA);
    }

    //console.log(poshoraActual)
       
    for  ( var i=0; i<=5 ; i++ ){ // recorre los min 00 10 20 30 40 50
      flagNuevo = true;
      itemNuevo=null;

      for( let pacHoraDisp of items ){  // recorre todos los pacientes que tiene reservado en este dia y hora del porfesional
            if ( pacHoraDisp.poshora[i].pos == 1 ){ //pos 0 0 1 1 1 0
              flagNuevo = false;  // no crea una nueva reserva vacia
              if ( pacHoraDisp.posEnLista == i ){
                itemNuevo=pacHoraDisp;
                itemsT.push(itemNuevo);
              }
            }
      }

      if( flagNuevo ){
        itemNuevo = {
                nombrePaciente: '',
                nombreEstablecimiento: '',
                horaReservado: '',
                minReservado: '',
                btnReserva: true,
                posEnLista:i,
                poshora: poshoraActual
            };
        itemsT.push(itemNuevo);
      }
    }
    return itemsT;
  }

  accionReservar(posEnLista: number, poshora:PosHora[], hora: number){
    console.log('pos en lista: ', posEnLista);
    console.log('pos hora: ',poshora);
    console.log('hora: ',hora);
  }

  selectToday() {
    this.model = {
      year: my.getFullYear(),
      month: my.getMonth() + 1,
      day: my.getDate()
    };
  }

  onDateChange(date: NgbDateStruct) {
    this.formatoFecha(date);
  }

  cerrarModal(){
    this.selectToday();
  	this._modalReservaService.ocultarModal();
  }
  btnGuardar(){
    this.selectToday();
  }

  formatoFecha(date: NgbDateStruct){
    let mes:string='';
    switch (date.month){
      case 1:
        mes='Enero';
        break;
      case 2:
        mes='Febrero';
        break;
      case 3:
        mes='Marzo';
        break;
      case 4:
        mes='Abril';
        break;
      case 5:
        mes='Mayo';
        break;
      case 6:
        mes='Junio';
        break;
      case 7:
        mes='Julio';
        break;
      case 8:
        mes='Agosto';
        break;
      case 9:
        mes='Septiembre';
        break;
      case 10:
        mes='Octubre';
        break;
      case 11:
        mes='Noviembre';
        break;
      case 12:
        mes='Diciembre';
        break;
      default:
        mes='';
        break;                      
    }
    this.stringDate=date.day+' de '+ mes +' del '+date.year;
  }


}
