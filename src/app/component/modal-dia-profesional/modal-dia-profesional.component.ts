import { Component, OnInit } from '@angular/core';
import { ModalDiaProfesionalService } from './modal-dia-profesional.service';
import { NgbDateStruct,NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// interface ListaHoras {
//   nombre: string,
//   hora: string
// };

interface hora {
  nombre: string,
  hora: string,
  valor: boolean
};

interface horaDia {
  dia: string,
  horas: hora[]
}

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

  public horasDia: horaDia[]=[];
  horaDiaVacio:horaDia;
  horaDiaSeleccionado:horaDia;

  cargando: boolean = true;

  forma: FormGroup;

  flagEsNuevo=false;
  
  constructor(
    private fb: FormBuilder,
  	public _modalDiaProfesionalService: ModalDiaProfesionalService
  ) { 

    this._modalDiaProfesionalService.notificacion
          .subscribe( resp => {
            this.cargarHorasDia();
          } ); 
     this.createForm();

  }

  ngOnInit() {
    this.genererHoraDiaVacio();
    this.selectToday();
    
    //this.generaHoraDia();
    //this.cargarHorasDia_borrar();

  }

  cargarHorasDia(){
    this.cargando = true;
    this.createForm();
    this.forma.get('horaDia').reset();

    let items = this.forma.get('horaDia') as FormArray;

    // buscar Horas del dia seleccionado
    this.horaDiaSeleccionado = this.horaDiaVacio;
    this.flagEsNuevo=true;
    
    this.horasDia=this._modalDiaProfesionalService.horasDia;
    
   // if( this._modalDiaProfesionalService.horasDia.length != 0){
      for(let hrDiaBD of this._modalDiaProfesionalService.horasDia){
        //console.log(this.horasDia);
        var fechaSeleccionada: string;
        fechaSeleccionada=this.modelToString(this.model);

        //console.log('diaBD: '+ hrDiaBD.dia+', '+'selec: '+ fechaSeleccionada);
        if(hrDiaBD.dia === fechaSeleccionada){
           this.horaDiaSeleccionado = hrDiaBD;
           this.flagEsNuevo=false;
           //console.log(this.horaDiaSeleccionado);
          break;
        }
      }
    //}
    
 
    for(let horaD of this.horaDiaSeleccionado.horas){
      //console.log(horaD);
      items.push(this.fb.group(horaD));
    }
    this.cargando = false;
  }
  
  createForm() {
      
      this.forma = this.fb.group({
          horaDia: this.fb.array([])
      });
     
  }
  
  // cargarHorasDia_borrar(){
  //   this.createForm();
  //   this.forma.get('horaDia').reset();

  //   let items = this.forma.get('horaDia') as FormArray;

  //   // buscar Horas del dia seleccionado
  //   this.horaDiaSeleccionado = this.horaDiaVacio;
  //   this.flagEsNuevo=true;
    
  //   for(let hrDiaBD of this.horasDia){
  //     var fechaSeleccionada: string;
  //     fechaSeleccionada=this.modelToString(this.model);

  //     //console.log('diaBD: '+ hrDiaBD.dia+', '+'selec: '+ fechaSeleccionada);
  //     if(hrDiaBD.dia === fechaSeleccionada){
  //        this.horaDiaSeleccionado = hrDiaBD;
  //        this.flagEsNuevo=false;
  //        //console.log(this.horaDiaSeleccionado);
  //       break;
  //     }
  //   }
 
  //   for(let horaD of this.horaDiaSeleccionado.horas){
  //     //console.log(horaD);
  //     items.push(this.fb.group(horaD));
  //   }

  // }
  genererHoraDiaVacio(){
    //this.horaDiaVacio;
    let hrs: hora[]=[];
    let hr: hora;

    for (var i = 8; i <= 22; i++){
      hr={
           nombre: 'hora'+i,
           hora: i+':00',
           valor: false,
        };
        hrs.push(hr);
    }

    this.horaDiaVacio={
      dia: this.modelToString(this.model),
      horas: hrs
    }
  }

  // generaHoraDia(){
  //   this.horasDia=[];
  //   let horaD:horaDia;
  //   let hrs: hora[]=[];
  //   let hr: hora;
    
   
  //   for( var d=0; d<=5;d++){
  //     hrs=[];
  //     for (var i = 8; i <= 22; i++) {
  //       hr={
  //          nombre: 'hora'+i,
  //          hora: i+':00',
  //          valor: true,
  //       };
  //       hrs.push(hr);
  //     } 

  //     let diaA: Date;
  //     diaA=this.toModel(this.model);
  //     diaA.setDate(diaA.getDate() + d);
  //     let diaM: NgbDateStruct;
  //     diaM=this.fromModel(diaA);
      
  //     horaD={
  //       dia: this.modelToString(diaM),
  //       horas: hrs
  //     }
  //     this.horasDia.push(horaD);
  //  }
  //   //console.log(this.horasDia);
  // }

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
  modelToString(date: NgbDateStruct): string{
    return date ? date.day+'-'+date.month+'-'+date.year : '';
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
    this.cargarHorasDia();

  }

  cerrarModal(){
    this.selectToday();
  	this._modalDiaProfesionalService.ocultarModal();
  }
  btnGuardar(){
    let nuevoHorasDias: horaDia;
    let indexBorrar:number;
    let diaActual = this.modelToString(this.model);


    indexBorrar = this.horasDia.findIndex(x => x.dia === diaActual); 

    nuevoHorasDias={
          dia: diaActual,
          horas: this.forma.value.horaDia
    }

    if(indexBorrar == -1){
       this.horasDia.push(nuevoHorasDias);
    }else{
      this.horasDia.splice(indexBorrar,1,nuevoHorasDias);
    }

    
    this._modalDiaProfesionalService.guardarDisponibilidadDia(this.horasDia.sort((a, b) => a.dia.localeCompare(b.dia)));
    this._modalDiaProfesionalService.ocultarModal();
    //console.log('Guardar:' + this.horasDia);
  }

  btnEliminarDiayGuardar(){
    let indexBorrar:number;
    let diaActual = this.modelToString(this.model);


    indexBorrar = this.horasDia.findIndex(x => x.dia === diaActual); 

    if(indexBorrar != -1){
       this.horasDia.splice(indexBorrar,1);
       this._modalDiaProfesionalService.guardarDisponibilidadDia(this.horasDia.sort((a, b) => a.dia.localeCompare(b.dia)));
    }
    
   
    this._modalDiaProfesionalService.ocultarModal();
    //console.log('Guardar:' + this.horasDia);
  }
 

}
