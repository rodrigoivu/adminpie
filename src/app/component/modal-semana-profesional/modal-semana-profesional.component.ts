import { Component, OnInit } from '@angular/core';
import { ModalSemanaProfesionalService } from './modal-semana-profesional.service';
interface ListaHorasSem {
  nombreLu: string,
  nombreMa: string,
  nombreMi: string,
  nombreJu: string,
  nombreVi: string,
  nombreSa: string,
  nombreDo: string,
  hora: string
};
@Component({
  selector: 'app-modal-semana-profesional',
  templateUrl: './modal-semana-profesional.component.html',
  styles: []
})
export class ModalSemanaProfesionalComponent implements OnInit {

  public horasListaSem : ListaHorasSem[]=[];
  
  constructor(
  	public _modalSemanaProfesionalService: ModalSemanaProfesionalService
  ) { }

  ngOnInit() {
    this.generaListaHoraSem();
  }

  generaListaHoraSem(){
    this.horasListaSem=[];
    let lh: ListaHorasSem;
    for (var i = 8; i <= 22; i++) {
      lh={
         nombreLu: 'horaLu'+i,
         nombreMa: 'horaMa'+i,
         nombreMi: 'horaMi'+i,
         nombreJu: 'horaJu'+i,
         nombreVi: 'horaVi'+i,
         nombreSa: 'horaSa'+i,
         nombreDo: 'horaDo'+i,
         hora: i+':00'
      };
    this.horasListaSem.push(lh);
    }
    
  }

  cerrarModal(){
  	this._modalSemanaProfesionalService.ocultarModal();
  }
  registrarHoraSem(){
    console.log('Guarda Hora Semanal')

  }
}
