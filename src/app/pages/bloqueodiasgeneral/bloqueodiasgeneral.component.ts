import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const equalsBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two &&  two.month === one.month && two.day === one.day;

const beforeBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false :  one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month ;

const afterBloqueado = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false :  one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month ;



interface ListaBloqueo{
	day: number,
	month: number,
	descripcion: string
}

interface RangoBloqueo{
  dateDesde: NgbDateStruct,
  dateHasta: NgbDateStruct,
  descripcion: string
}        

@Component({
  selector: 'app-bloqueodiasgeneral',
  templateUrl: './bloqueodiasgeneral.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.selected{
      background-color: rgb(250, 150, 50);
      color: white;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class BloqueodiasgeneralComponent implements OnInit {
  itemsBloqueados: RangoBloqueo[]=[];
  totalRegistros: number = 0;

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  fromDateS: string;
  toDateS: string;

  lista: number[]=[1,2,3];
  listaBloqueo: ListaBloqueo[]=[];
  
  //Visualización
  displayMonths = 3;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';

  descripcionTooltip: string='Vacaciones';
  descripcionInput:string='';

  
  constructor(
  	calendar: NgbCalendar
  ) {
  		this.fromDate = calendar.getToday();
    	this.toDate = this.fromDate;

      this.fromDateS=this.formatoFechaDiaMes(this.fromDate);
      this.toDateS=this.formatoFechaDiaMes(this.toDate);

      //this.mostrarFechas();
      //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit() {
  	this.cargaListaBloqueo();
  }
  onDateSelection(date: NgbDateStruct) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromDateS=this.formatoFechaDiaMes(date);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.toDateS=this.formatoFechaDiaMes(date);

    } else {
      this.toDate = null;
      this.fromDate = date;
      this.fromDateS=this.formatoFechaDiaMes(date);
      this.toDateS='No seleccionado';
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  isInList = date => {
  	let match: boolean=false;

    for ( let rb of this.itemsBloqueados){
      if( afterBloqueado(date, rb.dateDesde) && beforeBloqueado(date, rb.dateHasta) || equalsBloqueado(date, rb.dateDesde) || equalsBloqueado(date, rb.dateHasta)){
          match = true;
          break;
        }
    }
  	return match;
  };
  
  ValorTooltip = date => {
  		let tt: string='';

      for ( let rb of this.itemsBloqueados){
        if( afterBloqueado(date, rb.dateDesde) && beforeBloqueado(date, rb.dateHasta) || equalsBloqueado(date, rb.dateDesde) || equalsBloqueado(date, rb.dateHasta)){
            tt = rb.descripcion;
            break;
        }
      }

	  	return tt;
  };

  
  cargaListaBloqueo(){
  	let lb: ListaBloqueo= null;

  	for(let i =0; i<=10; i++){
  		lb={
  			day:i,
  			month:i,
  			descripcion:'Vacaciones'+i
  		}
  		this.listaBloqueo.push(lb);
  	}
  }

  // agrega item a variable itemsBloqueados
  ingresaRango(){
    let rb: RangoBloqueo=null;
    let indexFind1:number; //rango seleccionado contiene a datos guardadios
    let indexFind2:number; // el dato de fromDate esta dentro de los datos guardados
    let indexFind3:number; // el datos de toDate esta dentro de los datos guardados
    
    indexFind1 = this.itemsBloqueados.findIndex(x => afterBloqueado(x.dateDesde, this.fromDate) && beforeBloqueado(x.dateHasta, this.toDate) || equalsBloqueado(x.dateDesde, this.fromDate) || equalsBloqueado(x.dateHasta, this.toDate)); 
    indexFind2 = this.itemsBloqueados.findIndex(x => afterBloqueado(this.fromDate,x.dateDesde) && beforeBloqueado(this.fromDate,x.dateHasta) || equalsBloqueado(this.fromDate,x.dateDesde) || equalsBloqueado(this.fromDate,x.dateHasta)); 
    indexFind3 = this.itemsBloqueados.findIndex(x => afterBloqueado(this.toDate,x.dateDesde) && beforeBloqueado(this.toDate,x.dateHasta) || equalsBloqueado(this.toDate,x.dateDesde) || equalsBloqueado(this.toDate,x.dateHasta)); 
    
    if (indexFind1 !=-1 || indexFind2 !=-1 || indexFind3 !=-1){
      swal('No permitodo', 'Rango o fecha seleccionada incluyen fechas ya registradas', 'error');
    }

    if(indexFind1 ==-1 && indexFind2 ==-1 && indexFind3 ==-1){  //si no existe lo ingresa
        if (this.fromDate && this.toDate) {
          //console.log('ingresar rango fechas');
          rb={
            dateDesde: this.fromDate,
            dateHasta: this.toDate,
            descripcion: this.descripcionInput
          };
          this.itemsBloqueados.push(rb);
        }else if(this.fromDate && !this.toDate){
         // console.log('ingresar rango mismo dia');
          rb={
            dateDesde: this.fromDate,
            dateHasta: this.fromDate,
            descripcion: this.descripcionInput
          };
          this.itemsBloqueados.push(rb);
        }else{
          console.log('no ingresar');
        }
    }
   this.fromDate=null;
   this.toDate=null;
   this.fromDateS='Sin seleccionar';
   this.toDateS='Sin seleccionar';
   this.descripcionInput='';

  }



  borrarBloqueo(item: RangoBloqueo){

    let indexFind:number;
  
    indexFind = this.itemsBloqueados.findIndex(x => x === item); 

    if(indexFind != -1){  //item encontrado
      this.itemsBloqueados.splice(indexFind,1);
    } 

  }

  formatoFechaDiaMes(date: NgbDateStruct): string{
    let fechaS: string='';
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
    fechaS = nombreDia+', '+date.day+' de '+ mes ;
    return fechaS;
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
