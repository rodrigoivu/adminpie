import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { Anamnesis } from '../../models/anamnesis.model';
import { PacienteService, AnamnesisService } from '../../services/service.index';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface NgbDate {
  day: number,
  month: number,
  year: number
}

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styles: []
})
export class FichasComponent implements OnInit {
  nombrePaciente:string ='';
  rutPaciente: string='';
  emailPaciente: string='';
  telefonoPaciente: string='';
  _idPaciente: string='';

  usuario:any;
  role:string;
  _idUsuario: string;

  //FORMULARIOS
  formAnamnesis: FormGroup;
  newformAnamnesis: boolean=false;
  


  constructor(
       private fb: FormBuilder,
  		 public _pacienteService: PacienteService,
       public _anamnesisService: AnamnesisService
  	) { 
    this.usuario=JSON.parse(localStorage.getItem('usuario'));
    this._idUsuario = this.usuario._id;
    this.role = this.usuario.role;
  	
  }

  ngOnInit() {
    //this.formAnamnesisAntecedentesFamiliares = this.fb.group({});
  	this.nombrePaciente = this._pacienteService.nombrePaciente;
  	this.rutPaciente = this._pacienteService.rutPaciente;
  	this.emailPaciente = this._pacienteService.emailPaciente;
  	this.telefonoPaciente = this._pacienteService.telefonoPaciente;
    this._idPaciente = this._pacienteService._id;

    //console.log('idPaciente:' + this._id);

    this.buscarFichaAnamnesis(this._idPaciente);

  }

  buscarFichaAnamnesis(id: string){
    this._anamnesisService.cargarAnamnesis(id)
        .subscribe(resp => {
          if(resp.anamnesis){
            //Existe Ficha
            this.newformAnamnesis=false;
            this._anamnesisService.fichaAnamnesis = resp.anamnesis;
          }else{
            //No hay ficha hay que crearla
            this.newformAnamnesis=true;
            this._anamnesisService.inicializaFichaAnamnesis();
          }
         //Inicializa Formulario
          this.iniFormAnamnesisAntecedentesFamiliares();
        });
  }

  //Inicializa Formularios

  iniFormAnamnesisAntecedentesFamiliares(){
    let diaAnam: number;
    let mesAnam: number;
    let anoAnam: number;
    let fechaAnamnesis: string;
    let userProfesionalName: any;

    if(!this.newformAnamnesis){
      //console.log('SI HAY FECHA');
      diaAnam = this._anamnesisService.fichaAnamnesis.fecha.day;
      mesAnam = this._anamnesisService.fichaAnamnesis.fecha.month;
      anoAnam = this._anamnesisService.fichaAnamnesis.fecha.year;
      fechaAnamnesis = diaAnam+'/'+mesAnam+'/'+anoAnam;
      userProfesionalName = this._anamnesisService.fichaAnamnesis.user.name
    }else{
      //console.log('NO HAY FECHA');
      fechaAnamnesis = null;
      userProfesionalName = null;
    }
    //console.log(this._anamnesisService.fichaAnamnesis.antecedentesFamiliares);  
    this.formAnamnesis = this.fb.group({
           fecha: new FormControl(fechaAnamnesis),
           profesional: new FormControl(userProfesionalName),
           anamnesisAntecedentesFamiliares: this.fb.group(this._anamnesisService.fichaAnamnesis.antecedentesFamiliares)
    });

    // this.formAnamnesisAntecedentesFamiliares = new FormGroup({
    //   nombre: new FormControl(null, Validators.required),
    //   correo: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, Validators.required),
    //   password2: new FormControl(null, Validators.required),
    //   condiciones: new FormControl(false)
    // }, { validators: this.sonIguales( 'password', 'password2') });

    // this.formAnamnesisAntecedentesFamiliares.setValue({
    //   nombre:'Test',
    //   correo:'test@test.com',
    //   password:'123456',
    //   password2:'123456',
    //   condiciones: true

    // });
  }

  registrarAnamnesis(){
    let registroAnamnesis: Anamnesis;
    let my = new Date();
    let fecha: NgbDate={
      day: my.getDay(),
      month: my.getMonth() + 1 ,
      year: my.getFullYear(),
    }

    if(!this.newformAnamnesis){
      //Ya existe entonces Actualizar
      registroAnamnesis = new Anamnesis(
          this._idPaciente,
          this._anamnesisService.fichaAnamnesis.user._id,
          fecha,
          this.formAnamnesis.value.anamnesisAntecedentesFamiliares
      );

      this._anamnesisService.actualizarAnamnesis(registroAnamnesis)
          .subscribe();
    }else{
      //No existe entonces crear
      registroAnamnesis = new Anamnesis(
          this._idPaciente,
          this._idUsuario,
          fecha,
          this.formAnamnesis.value.anamnesisAntecedentesFamiliares
      );

      this._anamnesisService.crearAnamnesis(registroAnamnesis)
          .subscribe();
    }

  }

  iniciarDatos(){
  	
  
  }

}
