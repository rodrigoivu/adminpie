import { Component, OnInit } from '@angular/core';
import { ModalCreaPacienteService } from './modal-crea-paciente.service';
import { NgbDateStruct,NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-modal-crea-paciente',
  templateUrl: './modal-crea-paciente.component.html',
  styles: []
})
export class ModalCreaPacienteComponent implements OnInit {
  model: NgbDateStruct; // para fecha de cumpleaños
  forma: FormGroup;
  flgCrea: boolean=false;

  archivoSubir1: File;
  archivoSubir2: File;

  edadPaciente: number;

  constructor(
  	private fb: FormBuilder,
  	public _modalCreaPacienteService: ModalCreaPacienteService
  ) { 

  	this.createForm();

    //NOTIFICACION DE CREA EDITA PACIENTE 
    this._modalCreaPacienteService.notificacionEditaCreaPaciente
          .subscribe( resp => {
                if(resp){
                  this.flgCrea = false;
                  this.setFormEdita();
                }else{
                  this.flgCrea = true;
                  this.setFormCrea();
                }
          } ); 
  }

  ngOnInit() {
   this.onChanges();
  }

  onChanges(): void {
    this.forma.get('fechaNacimiento').valueChanges.subscribe( (val:string) => {
     console.log('cambiando fecha');
     let edad: number = this.calculateAge(val);
     if(isNaN(edad)){
       this.edadPaciente = null;
     }else{
       this.edadPaciente = this.calculateAge(val);
     }
      
    });

    
  }
  createForm() {
      
      this.forma = this.fb.group({
             rut: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}')]),
      	     name: new FormControl(null, Validators.required),
             fechaNacimiento: new FormControl(null, Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}')),
             establecimiento: null,
             nivel: null,
             direccion: null,
             fijo: null,
             celular: null,
      		   email: new FormControl(null, Validators.email),

      });
     
  }

  setFormEdita(){
    this.forma.setValue({
             rut: this._modalCreaPacienteService.pacienteSeleccionado.rut,
             name: this._modalCreaPacienteService.pacienteSeleccionado.name,
             fechaNacimiento:this._modalCreaPacienteService.pacienteSeleccionado.fechaNacimiento,
             establecimiento: this._modalCreaPacienteService.pacienteSeleccionado.establecimiento,
             nivel: this._modalCreaPacienteService.pacienteSeleccionado.nivel,
             direccion: this._modalCreaPacienteService.pacienteSeleccionado.direccion,
             fijo: this._modalCreaPacienteService.pacienteSeleccionado.fijo,
             celular: this._modalCreaPacienteService.pacienteSeleccionado.celular,
             email: this._modalCreaPacienteService.pacienteSeleccionado.email,
      });
  }
  setFormCrea(){
    this.forma.setValue({
             rut: null,
             name: null,
             fechaNacimiento:null ,
             establecimiento: null,
             nivel: null,
             direccion: null,
             fijo: null,
             celular: null,
             email: null

      });
  }

  cerrarModal(){
  	this._modalCreaPacienteService.ocultarModal();
  }

  calculateAge(birthday: string) {
    let birthday_arr: string[] = birthday.split('-');
    var birthday_date:Date = new Date(parseInt(birthday_arr[2]), parseInt(birthday_arr[1]) - 1, parseInt(birthday_arr[0]));
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  btnGuardar(){
    if(this.flgCrea){
      this._modalCreaPacienteService.guardarPaciente(this.forma.value);
    }else{
      this._modalCreaPacienteService.actualizaPaciente(this.forma.value);
    }
    
    this._modalCreaPacienteService.ocultarModal();
  }

  seleccionArchivo( archivo: File , valor:number){

    if(!archivo){
      switch(valor) { 
         case 1: { 
            this.archivoSubir1 = null;
            break; 
         } 
         case 2: { 
            this.archivoSubir2 = null;
            break; 
         } 
      } 
      
      return;
    }
    if( archivo.type.indexOf('pdf') < 0 ){
      swal('Sólo PDF', 'El archivo seleccionado no es un PDF', 'error');
      switch(valor) { 
         case 1: { 
            this.archivoSubir1 = null;
            break; 
         } 
         case 2: { 
            this.archivoSubir2 = null;
            break; 
         } 
      } 
      return;
    }

    switch(valor) { 
         case 1: { 
            this.archivoSubir1 = archivo;
            break; 
         } 
         case 2: { 
            this.archivoSubir2 = archivo;
            break; 
         } 
      } 

  }

  guardarArchivo(itemArchivo:string, valor: number){
    switch(valor) { 
         case 1: { 
            this._modalCreaPacienteService.guardarArchivo( itemArchivo, this.archivoSubir1);
            break; 
         } 
         case 2: { 
            this._modalCreaPacienteService.guardarArchivo( itemArchivo, this.archivoSubir2);
            break; 
         } 
      } 
    
  }

}
