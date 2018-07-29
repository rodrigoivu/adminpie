import { Component, OnInit } from '@angular/core';
import { ModalReservaService } from '../modal-reserva/modal-reserva.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
//import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';

interface minValor{ 
    minId: number,
    minStr: string
};

interface PosHora{ // de la base de datos
    pos: number
};

@Component({
  selector: 'app-modal-crea-reserva',
  templateUrl: './modal-crea-reserva.component.html',
  styles: []
})
export class ModalCreaReservaComponent implements OnInit {
  forma: FormGroup;
  diaFormatoBD: string;
  diaFormatoString: string;
  diaFormatoModel: NgbDateStruct;
  diaFormatoDate: Date;
  numeroDiaSemana: number;
  minvalores: minValor[]=[];
  horaReservaString: string;

  pacientes: Paciente[]=[];

  clickedPaciente: Paciente;
  nombrePaciente:string='';
  emailPaciente:string='';
  telefonoPaciente:string='';
  

  diaRepite: number;
  diarRepiteStr: string;
  anoRepite: number;

  sinPaciente: boolean= true;

  constructor(
  	private fb: FormBuilder,
  	public _modalReservaService: ModalReservaService,
    public _pacienteService: PacienteService,
    //config: NgbTypeaheadConfig
  ) {

  	 this._modalReservaService.notificacionCreaReserva
          .subscribe( resp => {
            this.createForm();
            this.inicializaDatos();
            this.cargarMinPosibles();
            this.cargarPacientes();
          } ); 	
     this.createForm();
     //config.showHint = true;
  }

  ngOnInit() {
   this.sinPaciente=true;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.pacientes.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.rut.toLowerCase().indexOf(term.toLowerCase()) > -1  ).slice(0, 10))

    );

  formatter = (x: {name: string, rut: string}) => x.name +', Rut: '+ x.rut;

  cargarPacientes(){
    this.pacientes=[];

    this._pacienteService.cargarPacientes(0)
        .subscribe( (resp: any) =>{
          this.pacientes = resp.pacientes;
          
     });

     
     
  }  

  inicializaDatos(){
    let posEnLista:number = this._modalReservaService.posEnLista;
    let horareserva:number = this._modalReservaService.horaReserva;
    let minstr:string;
    this.diaFormatoModel=this._modalReservaService.fecha;
    this.diaFormatoDate = this.toModel(this.diaFormatoModel);
    this.numeroDiaSemana = this.diaFormatoDate.getDay();
    this.formatoFecha(this.diaFormatoModel);
    this.diaFormatoBD=this.modelToString(this.diaFormatoModel);

    //Borra Paciente selleccionado
    this.clickedPaciente = new Paciente('');
    this.nombrePaciente = '';
    this.emailPaciente = '';
    this.telefonoPaciente = '';


    switch (posEnLista){
            case 0:{   
              minstr = ': 00';
              break;
            }
            case 1:{   
              minstr = ': 10';
              break;
            }
            case 2:{   
              minstr = ': 20';
              break;
            }
            case 3:{   
              minstr = ': 30';
              break;
            }
            case 4:{   
              minstr = ': 40';
              break;
            }
            case 5:{   
              minstr = ': 50';
              break;
            }
            
            default:{   
              minstr=': 00';
              break;
            }
          }

    if( horareserva < 12){
      this.horaReservaString = horareserva + ' ' + minstr + ' de la mañana';
    }
    if( horareserva > 12){
      this.horaReservaString = horareserva + ' ' + minstr + ' de la tarde';
    }
    if( horareserva == 12 && posEnLista == 0){
      this.horaReservaString = horareserva + ' ' + minstr + ' del día';
    }
    if( horareserva == 12 && posEnLista != 0){
      this.horaReservaString = horareserva + ' ' + minstr + ' de la tarde';
    }
    
  }

  createForm() {
      
      this.forma = this.fb.group({
          minPosibles: new FormControl(null, Validators.required),
          pacienteSeleccionado: new FormControl(null, Validators.required),
          repite: new FormControl(null, Validators.required)
      });
     
  }
  
  
  cargarMinPosibles(){
   
    let posEnLista:number = this._modalReservaService.posEnLista;
    let min: number = 0;
    let minvalor: minValor;
    this.minvalores=[];

    for(let e = posEnLista; e<=5; e++){
      if (this._modalReservaService.poshora[e].pos == 0){
        min=min+10;
        minvalor={
          minId: e,
          minStr: min +' minutos'
        }
       // console.log('min:' + min);
        this.minvalores.push(minvalor);
        
      }else{
        break;
      }
    }
    if(this.minvalores.length > 0){  // colocar el valor inicial
      this.forma.get('minPosibles').setValue(posEnLista);
    }
   
  }
  cerrarModal(){

  	this._modalReservaService.ocultarModalCreaReserva();
  }

  selectedItem(item){
    this.clickedPaciente=item.item;
    this.nombrePaciente = this.clickedPaciente.name;
    this.emailPaciente = this.clickedPaciente.email;
    this.telefonoPaciente = this.clickedPaciente.fijo +' / '+ this.clickedPaciente.celular;

    this.sinPaciente=false;
    //console.log(item.item);
  }

  btnGuardar(){
   let posEnLista:number = this._modalReservaService.posEnLista;
   let idPac:string = this.clickedPaciente._id;
   let minSel:number = this.forma.value.minPosibles
   let poshoraGuardar: PosHora[]=[];
   let poshoraG: PosHora;
   let horaR:number = this._modalReservaService.horaReserva-7;
   let repitedia:number;
   let repiteano:number;
   if(this.forma.value.repite == 'No' || this.forma.value.repite ==null){
     repitedia = 10;
     repiteano = this.anoRepite; // este registro se guarda igual aunque el día no se repita
   }else{
     repitedia = this.diaRepite;
     repiteano = this.anoRepite;
   }
   
    //Crear Estado de posiciones
    for  ( var i=0; i<=5 ; i++ ){
    	poshoraG = { pos: 0 };
        if(i >= posEnLista && i<= minSel ){
        	poshoraG = { pos: 1 };
        }
        poshoraGuardar.push(poshoraG);
    }


  this._modalReservaService.guardarReserva(idPac,this.diaFormatoBD,horaR,poshoraGuardar, repitedia, repiteano);

  }

  formatoFecha(date: NgbDateStruct){
    let mes:string='';
    let nombreDia:string='';
    let nombreDiaSelecionado:Date =this.toModel(date);
    let diaDeSemana:number=nombreDiaSelecionado.getDay();
    this.diaRepite = diaDeSemana;
    
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
    this.diarRepiteStr = nombreDia;
    this.anoRepite = date.year;
    this.diaFormatoString=nombreDia+', '+date.day+' de '+ mes +' del '+date.year;
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
