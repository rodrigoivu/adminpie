import { Component, OnInit } from '@angular/core';
import { ModalReservaService } from '../modal-reserva/modal-reserva.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface minValor{ // de la base de datos
    minId: number,
    minStr: string
};

@Component({
  selector: 'app-modal-crea-reserva',
  templateUrl: './modal-crea-reserva.component.html',
  styles: []
})
export class ModalCreaReservaComponent implements OnInit {
  forma: FormGroup;

  diaFormatoString: string;
  diaFormatoModel: NgbDateStruct;
  diaFormatoDate: Date;
  numeroDiaSemana: number;
  minvalores: minValor[]=[];
  horaReservaString: string;



  constructor(
  	private fb: FormBuilder,
  	public _modalReservaService: ModalReservaService
  ) {

  	 this._modalReservaService.notificacionCreaReserva
          .subscribe( resp => {
            this.inicializaDatos();
            this.cargarMinPosibles();
          } ); 	
     this.createForm();

  }

  ngOnInit() {

  }

  inicializaDatos(){
    let posEnLista:number = this._modalReservaService.posEnLista;
    let horareserva:number = this._modalReservaService.horaReserva;
    let minstr:string;
    this.diaFormatoModel=this._modalReservaService.fecha;
    this.diaFormatoDate = this.toModel(this.diaFormatoModel);
    this.numeroDiaSemana = this.diaFormatoDate.getDay();
    this.formatoFecha(this.diaFormatoModel);

    switch (posEnLista){
            case 0:{   //domingo
              minstr = ': 00';
              break;
            }
            case 1:{   //lunes
              minstr = ': 10';
              break;
            }
            case 2:{   //martes
              minstr = ': 20';
              break;
            }
            case 3:{   //miercoles
              minstr = ': 30';
              break;
            }
            case 4:{   //jueves
              minstr = ': 40';
              break;
            }
            case 5:{   //viernes
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
          dia:'',
          minPosibles: new FormControl(null, Validators.required)
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
        console.log('min:' + min);
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

  btnGuardar(){

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
