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

interface ListaBloqueo{
	day: number,
	month: number,
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
  itemsBloqueados: any[]=[];
  totalRegistros: number = 0;

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  lista: number[]=[1,2,3];
  listaBloqueo: ListaBloqueo[]=[];
  
  //Visualización
  displayMonths = 1;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';

  descripcionTooltip: string='Vacaciones';

  
  constructor(
  	calendar: NgbCalendar
  ) {
  		this.fromDate = calendar.getToday();
    	this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit() {
  	this.cargaListaBloqueo();
  }
  onDateSelection(date: NgbDateStruct) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  isInList = date => {
  	let match: boolean=false;

  	for(let diaLista of this.listaBloqueo){
        if( date.day== diaLista.day  && date.month == diaLista.month){
        	match = true;
        	break;
        }
  	}

  	return match;
  };
  
  ValorTooltip = date => {
  		let tt: string='';

	  	for(let diaLista of this.listaBloqueo){
	        if( date.day== diaLista.day  && date.month == diaLista.month){
	        	tt = diaLista.descripcion;
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

  	console.log(this.listaBloqueo);
  }


  borrarBloqueo(){

  }


}
