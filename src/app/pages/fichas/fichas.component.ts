import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { Anamnesis } from '../../models/anamnesis.model';
import { PacienteService, AnamnesisService } from '../../services/service.index';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  pacienteEditando: Paciente;
 
  //Datos de usuario Actual
  usuario:any;
  role:string;
  _idUsuario: string;

  //Flag Indicadores
  newformAnamnesis: boolean=false;
  pacienteConDatos: boolean=false;

  //Titulos 
  titleAnamnesis: string = 'Ficha Anamnesis';
  titleCrearFicha: string = '( crear ficha )'

  //FORMULARIOS
  formDatosGenerales: FormGroup;
  formAnamnesis: FormGroup;
  
  


  constructor(
       private fb: FormBuilder,
  		 public _pacienteService: PacienteService,
       public _anamnesisService: AnamnesisService,
       private router: Router, 
       private route: ActivatedRoute
  	) { 

    this.usuario=JSON.parse(localStorage.getItem('usuario'));
    this._idUsuario = this.usuario._id;
    this.role = this.usuario.role;
  	
  }

  ngOnInit() {
    // este if es para evitar elementos vacio al recargar la página de fichas
    if (!this._pacienteService.pacienteSeleccionado){
      this.pacienteConDatos=false;
      this.router.navigate(['/pages/pacientes']);
     
    }else{
      this.pacienteConDatos=true;
      this.pacienteEditando = this._pacienteService.pacienteSeleccionado;
      this.iniFormDatosGenerales();
      this.buscarFichaAnamnesis( this.pacienteEditando._id );
    }
    
  }

  //CONTORL DE COMPONENTES DEPENDIENTES
  get otroEnfermedadPrePostNatal() { 
    let estado = this.formAnamnesis.get('anamnesisAntecedentesSalud').get('enfermedadesPrePostNatal').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
  }
  get otroEvaluacionEspecialista() { 
    return this.formAnamnesis.get('anamnesisHistorialClinico').get('otros').value
  }

  get otroIntervencionQuirurgica() { 
    let estado = this.formAnamnesis.get('anamnesisHistorialClinico').get('intervencionQuirurgicaHospitalizaciones').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
  }
  get otroMedicamentos() { 
    let estado = this.formAnamnesis.get('anamnesisHistorialClinico').get('medicamentos').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
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
  iniFormDatosGenerales(){
    this.formDatosGenerales = this.fb.group({
          
           name: new FormControl({value: null, disabled: true}),
           edad: new FormControl({value: null, disabled: true}),
           fechaNacimiento: new FormControl({value: null, disabled: true}),
           establecimiento: new FormControl({value: null, disabled: true}),
           nivel: new FormControl({value: null, disabled: true}),
           direccion: new FormControl({value: null, disabled: true}),
           fijo: new FormControl({value: null, disabled: true}),
           celular: new FormControl({value: null, disabled: true})

    });

    if(this.pacienteConDatos){

      this.formDatosGenerales.setValue({
          
          name: this.pacienteEditando.name,
          edad: '',
          fechaNacimiento: this.pacienteEditando.fechaNacimiento.day +'/'+this.pacienteEditando.fechaNacimiento.month+'/'+this.pacienteEditando.fechaNacimiento.year,
          establecimiento: this.pacienteEditando.establecimiento,
          nivel: this.pacienteEditando.nivel,
          direccion: this.pacienteEditando.direccion,
          fijo: this.pacienteEditando.fijo,
          celular: this.pacienteEditando.celular

      });
    }


     

  }
  iniFormAnamnesisAntecedentesFamiliares(){
    let diaAnam: number;
    let mesAnam: number;
    let anoAnam: number;
    let fechaAnamnesis: string;
    let userProfesionalName: any;

    if(!this.newformAnamnesis){
      diaAnam = this._anamnesisService.fichaAnamnesis.fecha.day;
      mesAnam = this._anamnesisService.fichaAnamnesis.fecha.month;
      anoAnam = this._anamnesisService.fichaAnamnesis.fecha.year;
      fechaAnamnesis = diaAnam+'/'+mesAnam+'/'+anoAnam;
      userProfesionalName = this._anamnesisService.fichaAnamnesis.user.name
    }else{

      fechaAnamnesis = null;
      userProfesionalName = null;
    }
   
    this.formAnamnesis = this.fb.group({
           fecha: new FormControl({value: fechaAnamnesis, disabled: true}),
           profesional: new FormControl({value: userProfesionalName, disabled: true}),
           anamnesisAntecedentesFamiliares: this.fb.group(this._anamnesisService.fichaAnamnesis.antecedentesFamiliares),
           anamnesisAntecedentesSalud: this.fb.group(this._anamnesisService.fichaAnamnesis.antecedentesSalud),
           anamnesisHistorialClinico: this.fb.group(this._anamnesisService.fichaAnamnesis.historialClinico),
           anamnesisDesarrolloEvolutivo: this.fb.group(this._anamnesisService.fichaAnamnesis.desarrolloEvolutivo),
           anamnesisDestrezasSocialesComunicativas: this.fb.group(this._anamnesisService.fichaAnamnesis.destrezasSocialesComunicativas),
           anamnesisComportamientoLudico: this.fb.group(this._anamnesisService.fichaAnamnesis.comportamientoLudico),
           anamnesisSituacionSocial: this.fb.group(this._anamnesisService.fichaAnamnesis.situacionSocial)
    });

    // this.formAnamnesisAntecedentesFamiliares = new FormGroup({
    //   nombre: new FormControl(null, Validators.required),
    //   correo: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, Validators.required),
    //   password2: new FormControl(null, Validators.required),
    //   condiciones: new FormControl(false)
    // }, { validators: this.sonIguales( 'password', 'password2') });


  }

  registrarAnamnesis(){
    let registroAnamnesis: Anamnesis;
    let my = new Date();
    let fecha: NgbDate={
      day: my.getDate(),
      month: my.getMonth() + 1 ,
      year: my.getFullYear(),
    }
   
    // FALTA VERIFICAR POR ROLE

    if(!this.newformAnamnesis){
      //Ya existe entonces Actualizar
      registroAnamnesis = new Anamnesis(
          this.pacienteEditando._id,
          this._anamnesisService.fichaAnamnesis.user._id,
          fecha,
          this.formAnamnesis.value.anamnesisAntecedentesFamiliares,
          this.formAnamnesis.value.anamnesisAntecedentesSalud,
          this.formAnamnesis.value.anamnesisHistorialClinico,
          this.formAnamnesis.value.anamnesisDesarrolloEvolutivo,
          this.formAnamnesis.value.anamnesisDestrezasSocialesComunicativas,
          this.formAnamnesis.value.anamnesisComportamientoLudico,
          this.formAnamnesis.value.anamnesisSituacionSocial
      );

      this._anamnesisService.actualizarAnamnesis(registroAnamnesis)
          .subscribe();
    }else{
      //No existe entonces crear
      registroAnamnesis = new Anamnesis(
          this.pacienteEditando._id,
          this._idUsuario,
          fecha,
          this.formAnamnesis.value.anamnesisAntecedentesFamiliares,
          this.formAnamnesis.value.anamnesisAntecedentesSalud,
          this.formAnamnesis.value.anamnesisHistorialClinico,
          this.formAnamnesis.value.anamnesisDesarrolloEvolutivo,
          this.formAnamnesis.value.anamnesisDestrezasSocialesComunicativas,
          this.formAnamnesis.value.anamnesisComportamientoLudico,
          this.formAnamnesis.value.anamnesisSituacionSocial

      );


      this._anamnesisService.crearAnamnesis(registroAnamnesis)
          .subscribe(resp =>{
            this.buscarFichaAnamnesis( this.pacienteEditando._id );
          });
    }

  }



  

}
