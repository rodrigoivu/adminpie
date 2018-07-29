import { Component, OnInit } from '@angular/core';
import { ModalReservaService } from './modal-reserva.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../../models/paciente.model';

//import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const equalsBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two &&  two.month === one.month && two.day === one.day;

const beforeBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false :  one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month ;

const afterBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false :  one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month ;

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
  poshora: PosHora[],
  repiteDia:number,
  repiteAno:number
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

  cargando: boolean = true;
  infoSinDatos: string='';
  conDatos: boolean = false;

  //forma: FormGroup;

  constructor(
   // private fb: FormBuilder,
  	public _modalReservaService: ModalReservaService
  ) {
      this._modalReservaService.notificacionInicioToday
        .subscribe( resp =>{
           this.selectToday();
        })
      this._modalReservaService.notificacion
          .subscribe( resp => {
            this.generaItemsReservado();
            this.cargarHorasDispProf();
            this.generaMuestraReservados();
            
          } ); 
   }

  ngOnInit() {
  	//this.selectToday();
    //this.generaItemsReservado();
    //this.generaHorasDispProf();
  }


  cargarHorasDispProf(){
    this.cargando =true;
    this.horasDispProf = [];
    let horaDispP: DiaponibleProfesional;
    let diaEncontrado:boolean= false; 

    let indexFind:number;
    let indexFindBloqueado:number;
    //Buscar Horarios disponibles por fecha
    //Primero en el registro de horasDia
    //Luego en el registro de HoraSemana
    var fechaSeleccionada: string;
    fechaSeleccionada=this.modelToString(this.model);

    //BUSCAR EN LISTA BLOQUEADOS
    indexFindBloqueado = this._modalReservaService.itemsBloqueados.findIndex (x => afterBloqueado(this.model, x.dateDesde) && beforeBloqueado(this.model, x.dateHasta) || equalsBloqueado(this.model, x.dateDesde) || equalsBloqueado(this.model, x.dateHasta));
    if(indexFindBloqueado == -1){  // NO encontrado en lista de bloqueo
        //console.log('Dia Libre General');

        this.infoSinDatos='';
           
        //BUSCAR EN HORAS DIA
        indexFind = this._modalReservaService.horasDia.findIndex(x => x.dia === fechaSeleccionada); 

        if(indexFind != -1){  //encontrado en horasDia
          this.infoSinDatos='Sin Horas Disponibles. Ésto fue configurado en la ventana de disponibilidad por día.';
          diaEncontrado=true;
          for(let hr of this._modalReservaService.horasDia[indexFind].horas){
            if(hr.valor){
                 let hrS : string = hr.hora;
                 let hri: number;
                 if(hrS.length<=4){
                   hri=Number(hrS.substring(0,1));
                 }else{
                   hri=Number(hrS.substring(0,2));
                 }
                 horaDispP={
                      horaDisp: hri-7,
                      horaDispMuestra: hri
                 }
                 this.horasDispProf.push(horaDispP);
               }
          }
        }else{               // no hay registro de disponibilidad de hora en ese dia
          diaEncontrado=false;
          this.infoSinDatos='';
          
        }


       //BUSCAR EN HORA SEMANA
       if(!diaEncontrado){
            let nombreDiaSelecionado:Date =this.toModel(this.model);
            let diaDeSemana:number=nombreDiaSelecionado.getDay();
            let hrActiva:boolean=false;
            let i:number =0;
            this.infoSinDatos='Sin Horas Disponibles. Ésto fue configurado en la ventana de disponibilidad por semana.';
            for(let hrSBD of this._modalReservaService.horaSemana){
              hrActiva=false;
              switch (diaDeSemana){
                case 0:{   //domingo
                  hrActiva = hrSBD.horaDo;
                  break;
                }
                case 1:{   //lunes
                  hrActiva = hrSBD.horaLu;
                  break;
                }
                case 2:{   //martes
                  hrActiva = hrSBD.horaMa;
                  break;
                }
                case 3:{   //miercoles
                  hrActiva = hrSBD.horaMi;
                  break;
                }
                case 4:{   //jueves
                  hrActiva = hrSBD.horaJu;
                  break;
                }
                case 5:{   //viernes
                  hrActiva = hrSBD.horaVi;
                  break;
                }
                case 6:{   //sábado
                  hrActiva = hrSBD.horaSa;
                  break;
                }
                default:{   
                  
                  break;
                }
              }

              if (hrActiva){
                 horaDispP={
                      horaDisp: i+1,  //1-15
                      horaDispMuestra: i+8. //8-22
                  }
                     this.horasDispProf.push(horaDispP);
              }else{

              }

              i++;
            }
         }

    }else{     //encontrado en lista de bloqueo
        //console.log('Concepto:' + this._modalReservaService.itemsBloqueados[indexFindBloqueado].descripcion);
        let concepto: string = this._modalReservaService.itemsBloqueados[indexFindBloqueado].descripcion;
        this.infoSinDatos='Día bloqueado. Ésto fue configurado en Bloqueos día general, por concepto de ' + concepto +'.';
    }        

    if(horaDispP){
      //console.log('Esta con datos');
      this.conDatos = true;
    }else{
      //console.log('Esta vacio')
      this.conDatos = false;
    }
     //console.log(this.horasDispProf);
     this.cargando =false;
  }

  
  
  // generaHorasDispProf(){
  //   this.horasDispProf = [];
  //   let horaDispP: DiaponibleProfesional;
  //   for (var i = 1; i <= 4; i++) {
  //     horaDispP={
  //       horaDisp: i,
  //       horaDispMuestra: 7+i
  //     }
  //     this.horasDispProf.push(horaDispP);
  //   }
  //   //console.log(this.horasDispProf);
  // }

  generaItemsReservado(){

    this.itemsReservado = [];

    let itemR: ItemReservado;
    let pacR: Paciente;
    let anoSelect= this.model.year;
    let flagNoMostrarRepetida=false;
    for (let ir of this._modalReservaService.itemsReservas){
      pacR = <Paciente> ir.paciente;
      flagNoMostrarRepetida=false;
      // No mostrar las repeticiones antes de la fecha resrevada
      if( ir.repiteDia != 10){  // si es distinto de 10 significa que es una reserva que se repite por dia 
        // y la fecha es anterior al dia de reserva
        let diaSelect: Date = new Date(this.model.year,this.model.month, this.model.day );
        let diaSplit: string[]= ir.fecha.split('-'); 
        let diaReserva: Date= new Date(parseInt(diaSplit[2]),parseInt(diaSplit[1]), parseInt(diaSplit[0]) );
        
        if(diaSelect < diaReserva){
          flagNoMostrarRepetida=true;
        }


      }
      if (anoSelect == ir.repiteAno && !flagNoMostrarRepetida){   //el año está en la BD si se repite el dia o no.
         itemR={
          nombrePaciente: pacR.name,
          nombreEstablecimiento: 'Establecimiento',
          horaReservado: ir.horaReservado,  //1-15
          poshora: ir.poshora,
          repiteDia: ir.repiteDia,
          repiteAno: ir.repiteAno
         };
         this.itemsReservado.push(itemR);
      }

     
    }
    
    //console.log(this.itemsReservado);
  }
  
  generaMuestraReservados(){

    this.listaReservadoTotal=[];
    
    let pacienteReservado: PacienteReservado;
    let pacientesReservados: PacienteReservado[]=[];
    let pacientesReservadosTransformados: PacienteReservado[]=[];
    let itemReservadoTotal: ListaReservadoTotal;

    var diaFormatoDate: Date = this.toModel(this.model);
    var numeroDiaSemana:number=diaFormatoDate.getDay();

    
    for ( let horaDispP of this.horasDispProf){ // recorre las horas disponibles de profesional
      for ( let itemR of this.itemsReservado){  // recorre los pacientes reservados en ese dia con ese profesional
        
        if( horaDispP.horaDisp == itemR.horaReservado){  // si la hora coincide
            

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
            if(iniMin==0){
                horaPacienteString=horaPaciente+':00';
            }else{
                horaPacienteString=horaPaciente+':'+minPaciente;
            }
            

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
      
      let hrD=horaDispP.horaDisp+7;
      pacientesReservadosTransformados= this.transformaPacientesPorHoraDisponible(pacientesReservados, hrD); //rellena con botones reservar hora a hora

      itemReservadoTotal={
        horaDisponible: hrD,
        pacientesPorHoraDisponible: pacientesReservadosTransformados
      }

      this.listaReservadoTotal.push(itemReservadoTotal);
      pacientesReservados=[];
      pacientesReservadosTransformados=[];

    }
      //console.log(this.listaReservadoTotal);
  }
  
  transformaPacientesPorHoraDisponible(items: PacienteReservado[], hrDisp:number){
    let itemNuevo: PacienteReservado;
    let itemsT: PacienteReservado[]=[];
    let flagNuevo: boolean=true;
    let poshoraActual: PosHora[]=[];
    let poshoraA: PosHora;
    let flagFechaPermitida: boolean = false

     //Comparacion Fecha actual con seleccionada

    let fechaActual:Date= new Date(my.getFullYear(),my.getMonth(), my.getDate()); //para que no cuente los milisegundos
    let fechaSel: Date = this.toModel(this.model);

    if(fechaActual < fechaSel){
      flagFechaPermitida=true;
    }
    if(fechaActual > fechaSel){
      flagFechaPermitida = false;
    }
    if(fechaActual.getTime() == fechaSel.getTime()){
      flagFechaPermitida=true;
    }
    

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

      if( flagNuevo && flagFechaPermitida){
        let hrD:string;
        if(i == 0){
            hrD = hrDisp+':00';
        }else{
            hrD = hrDisp+':'+i*10;
        }
        itemNuevo = {
                nombrePaciente: '',
                nombreEstablecimiento: '',
                horaReservado: hrD,
                minReservado: '10 min',
                btnReserva: true,
                posEnLista:i,
                poshora: poshoraActual
            };
        itemsT.push(itemNuevo);
      }
      if( flagNuevo && !flagFechaPermitida){
        itemNuevo = {
                nombrePaciente: '',
                nombreEstablecimiento: '',
                horaReservado: '',
                minReservado: '',
                btnReserva: false,
                posEnLista:i,
                poshora: poshoraActual
            };
        itemsT.push(itemNuevo);
      }
    }
    return itemsT;
  }

  accionReservar(posEnLista: number, poshora:PosHora[], hora: number){
    //var fechaSeleccionada: string;
    var diaFormatoDate: Date = this.toModel(this.model);
    var numeroDiaSemana:number=diaFormatoDate.getDay();

    //fechaSeleccionada=this.modelToString(this.model);
    // console.log('fechaSeleccionada:'+fechaSeleccionada);
    // console.log('pos en lista: ', posEnLista);
    // console.log('pos hora: ',JSON.stringify(poshora) );
    // console.log('hora: ',hora);

    this._modalReservaService.mostrarModalCreaReserva(this.model,numeroDiaSemana,posEnLista,poshora,hora);
    this.cerrarModal();
  }

  selectToday() {
    this.model = {
      year: my.getFullYear(),
      month: my.getMonth() + 1,
      day: my.getDate()
    };

    //console.log('paso por today');
  }

  onDateChange(date: NgbDateStruct) {

    let fecha = this.modelToString(date);
    this.formatoFecha(date);
    var diaFormatoDate: Date = this.toModel(this.model);
    var numeroDiaSemana:number=diaFormatoDate.getDay();

    this._modalReservaService.cargarReservas(fecha, numeroDiaSemana);
    //this.cargarHorasDispProf();
    //this.generaMuestraReservados();
  }

  cerrarModal(){
    //this.selectToday(); //reestablecer dia
  	this._modalReservaService.ocultarModal();
  }
  

  formatoFecha(date: NgbDateStruct){
    let mes:string='';
    let nombreDia:string='';
    let nombreDiaSelecionado:Date =this.toModel(date);
    let diaDeSemana:number=nombreDiaSelecionado.getDay();
    
    switch (diaDeSemana){
            case 0:{   //domingo
              nombreDia = 'Domingo';
              break;
            }
            case 1:{   //lunes
              nombreDia = 'Lunes';
              break;
            }
            case 2:{   //martes
              nombreDia = 'Martes';
              break;
            }
            case 3:{   //miercoles
              nombreDia = 'Miércoles';
              break;
            }
            case 4:{   //jueves
              nombreDia = 'Jueves';
              break;
            }
            case 5:{   //viernes
              nombreDia = 'Viernes';
              break;
            }
            case 6:{   //sábado
              nombreDia = 'Sábado';
              break;
            }
            default:{   
              
              break;
            }
          }
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
    this.stringDate=nombreDia+', '+date.day+' de '+ mes +' del '+date.year;
  }
  modelToString(date: NgbDateStruct): string{
    return date ? date.day+'-'+date.month+'-'+date.year : '';
  }
  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

  fromModel(date: Date): NgbDateStruct {
    return date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } : null;
  }

}
