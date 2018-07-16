import { Component, OnInit } from '@angular/core';
import { ModalSemanaProfesionalService } from './modal-semana-profesional.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface HoraSemanal{
  horaLu: boolean,
  horaMa: boolean,
  horaMi: boolean,
  horaJu: boolean,
  horaVi: boolean,
  horaSa: boolean,
  horaDo: boolean,
  nombreLu: string,
  nombreMa: string,
  nombreMi: string,
  nombreJu: string,
  nombreVi: string,
  nombreSa: string,
  nombreDo: string,
  hora: string
}

@Component({
  selector: 'app-modal-semana-profesional',
  templateUrl: './modal-semana-profesional.component.html',
  styles: []
})
export class ModalSemanaProfesionalComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
  	public _modalSemanaProfesionalService: ModalSemanaProfesionalService
  ) {
      this.createForm();
   }

  ngOnInit() {  }

  createForm() {
      let horaS: HoraSemanal;

      this.forma = this.fb.group({
          horaSemana: this.fb.array([])
      });

      let items = this.forma.get('horaSemana') as FormArray;

     for (var i = 8; i <= 22; i++){
       horaS={
          horaLu: true,
          horaMa: true,
          horaMi: true,
          horaJu: true,
          horaVi: true,
          horaSa: true,
          horaDo: true,
          nombreLu: 'horaLu'+i,
          nombreMa: 'horaMa'+i,
          nombreMi: 'horaMi'+i,
          nombreJu: 'horaJu'+i,
          nombreVi: 'horaVi'+i,
          nombreSa: 'horaSa'+i,
          nombreDo: 'horaDo'+i,
          hora: i+':00'
       }
       items.push(this.fb.group(horaS));
     }
  }

  cerrarModal(){
  	this._modalSemanaProfesionalService.ocultarModal();
  }
  registrarHoraSem(){

    this._modalSemanaProfesionalService.guardarDisponibilidadSemanal(this.forma.value.horaSemana);
    this._modalSemanaProfesionalService.ocultarModal();


  }
}
