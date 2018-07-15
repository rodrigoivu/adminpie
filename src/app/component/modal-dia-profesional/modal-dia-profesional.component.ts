import { Component, OnInit } from '@angular/core';
import { ModalDiaProfesionalService } from './modal-dia-profesional.service';
import { NgbDateStruct,  NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

interface ListaHoras {
  nombre: string,
  hora: string
};

const my = new Date();


@Component({
  selector: 'app-modal-dia-profesional',
  templateUrl: './modal-dia-profesional.component.html',
  styles: []
})
export class ModalDiaProfesionalComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number; month: number };
  stringDate: string;
  //Visualización
  displayMonths = 1;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';

  public horasLista : ListaHoras[]=[];
  
  constructor(
  	public _modalDiaProfesionalService: ModalDiaProfesionalService
  ) { 
   
    
  }

  ngOnInit() {
    this.selectToday();
    this.generaListaHora();
  }

  generaListaHora(){
    this.horasLista=[];
    let lh: ListaHoras;
    for (var i = 8; i <= 22; i++) {
      lh={
         nombre: 'hora'+i,
         hora: i+':00'
      };
    this.horasLista.push(lh);
    }
  }

  selectToday() {
    this.model = {
      year: my.getFullYear(),
      month: my.getMonth() + 1,
      day: my.getDate()
    };
  }

  onDateChange(date: NgbDateStruct) {
    this.stringDate=date.day+' - '+ date.month +' - '+date.year;
  }

  cerrarModal(){
    this.selectToday();
  	this._modalDiaProfesionalService.ocultarModal();
  }
  btnGuardar(){
    this.selectToday();
  }

}
