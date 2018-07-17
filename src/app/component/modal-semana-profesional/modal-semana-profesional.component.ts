import { Component, OnInit } from '@angular/core';
import { ModalSemanaProfesionalService } from './modal-semana-profesional.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profesional } from '../../models/profesional.model';

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
      this._modalSemanaProfesionalService.notificacion
          .subscribe( resp => {
            this.cargarHorasSemana();
          } ); 
      this.createForm();
   }

  ngOnInit() {
  
  }

  cargarHorasSemana(){
    this.createForm();
    this.forma.get('horaSemana').reset();
   // console.log(this._modalSemanaProfesionalService.horaSemana);
    let items = this.forma.get('horaSemana') as FormArray;
    
    for(let horaS of this._modalSemanaProfesionalService.horaSemana){
      items.push(this.fb.group(horaS));
    }

  }

  createForm() {
      
      this.forma = this.fb.group({
          horaSemana: this.fb.array([])
      });
     
  }

  cerrarModal(){
  	this._modalSemanaProfesionalService.ocultarModal();
  }
  registrarHoraSem(){

    this._modalSemanaProfesionalService.guardarDisponibilidadSemanal(this.forma.value.horaSemana);
    this._modalSemanaProfesionalService.ocultarModal();


  }
}
