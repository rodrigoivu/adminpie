import { Component, OnInit } from '@angular/core';
import { ModalSemanaProfesionalService } from './modal-semana-profesional.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  forma: FormGroup;
  valor: string = 'horaLu8';
  constructor(
    private fb: FormBuilder,
  	public _modalSemanaProfesionalService: ModalSemanaProfesionalService
  ) {
      this.createForm();
   }

  ngOnInit() {
    this.generaListaHoraSem();
    this.cargarHoras();
  }

  createForm() {
    this.forma = this.fb.group({
      name: '', // <--- the FormControl called "name"
    });
  }

  cargarHoras(){
    this.forma = new FormGroup({
       horaLu8: new FormControl(false),
       horaMa8: new FormControl(false),
       horaMi8: new FormControl(false),
       horaJu8: new FormControl(false),
       horaVi8: new FormControl(false),
       horaSa8: new FormControl(false),
       horaDo8: new FormControl(false)
    });
    this.forma.setValue({
       horaLu8: true,
       horaMa8: true,
       horaMi8: true,
       horaJu8: true,
       horaVi8: true,
       horaSa8: true,
       horaDo8: true

    });
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
