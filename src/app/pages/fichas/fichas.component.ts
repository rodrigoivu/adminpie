import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { Anamnesis } from '../../models/anamnesis.model';
import { Fonoaudiologia } from '../../models/fonoaudiologia.model';
import { General } from '../../models/general.model';
import { Kinesiologia } from '../../models/kinesiologia.model';
import { Psicologia } from '../../models/psicologia.model';
import { Terapeuta } from '../../models/terapeuta.model';
import { PacienteService, AnamnesisService, FonoaudiologiaService, GeneralService, KinesiologiaService, PsicologiaService, TerapeutaService} from '../../services/service.index';
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
  pacienteConDatos: boolean=false;
  newformAnamnesis: boolean=false;
  newformFonoaudiologia: boolean=false;
  newformGeneral: boolean=false;
  newformKinesiologia: boolean=false;
  newformPsicologia: boolean=false;
  newformTerapeuta: boolean=false;
  

  //Titulos 
  titleAnamnesis: string = 'Ficha Anamnesis';
  titleCrearFicha: string = '( crear ficha )'

  //FORMULARIOS
  formDatosGenerales: FormGroup;
  formAnamnesis: FormGroup;
  formFonoaudiologia: FormGroup;
  formGeneral: FormGroup;
  formKinesiologia: FormGroup;
  formPsicologia: FormGroup;
  formTerapeuta: FormGroup;
  


  constructor(
       private fb: FormBuilder,
  		 public _pacienteService: PacienteService,
       public _anamnesisService: AnamnesisService,
       public _fonoaudiologiaService: FonoaudiologiaService,
       public _generalService: GeneralService,
       public _kinesiologiaService: KinesiologiaService,
       public _psicologiaService: PsicologiaService,
       public _terapeutaService: TerapeutaService,
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
      this.buscarFichaFonoaudiologia( this.pacienteEditando._id ),
      this.buscarFichaGeneral( this.pacienteEditando._id );
      this.buscarFichaKinesiologia( this.pacienteEditando._id );
      this.buscarFichaPsicologia( this.pacienteEditando._id );
      this.buscarFichaTerapeuta( this.pacienteEditando._id );
    }
    
  }

  //CONTROL DE COMPONENTES DEPENDIENTES
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
          this.iniFormAnamnesis();
          
        });
  }
  buscarFichaFonoaudiologia(id: string){
    this._fonoaudiologiaService.cargarFicha(id)
        .subscribe(resp => {
          if(resp.fonoaudiologia){
            //Existe Ficha
            this.newformFonoaudiologia=false;
            
          }else{
            //No hay ficha hay que crearla
            this.newformFonoaudiologia=true;
            this._fonoaudiologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormFonoaudiologia();
          
     });
  }
  buscarFichaGeneral(id: string){
    this._generalService.cargarFicha(id)
        .subscribe(resp => {
          if(resp.general){
            //Existe Ficha
            this.newformGeneral=false;
            
          }else{
            //No hay ficha hay que crearla
            this.newformGeneral=true;
            this._generalService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormGeneral();
          
     });
  }
  buscarFichaKinesiologia(id: string){
    this._kinesiologiaService.cargarFicha(id)
        .subscribe(resp => {
          if(resp.kinesiologia){
            //Existe Ficha
            this.newformKinesiologia=false;
            
          }else{
            //No hay ficha hay que crearla
            this.newformKinesiologia=true;
            this._kinesiologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormKinesiologia();
          
     });
  }
  buscarFichaPsicologia(id: string){
    this._psicologiaService.cargarFicha(id)
        .subscribe(resp => {
          if(resp.psicologia){
            //Existe Ficha
            this.newformPsicologia=false;
            
          }else{
            //No hay ficha hay que crearla
            this.newformPsicologia=true;
            this._psicologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormPsicologia();
          
     });
  }
  buscarFichaTerapeuta(id: string){
    this._terapeutaService.cargarFicha(id)
        .subscribe(resp => {
          if(resp.terapeuta){
            //Existe Ficha
            this.newformTerapeuta=false;
            
          }else{
            //No hay ficha hay que crearla
            this.newformTerapeuta=true;
            this._terapeutaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormTerapeuta();
          
     });
  }

  //INICIALIZA FORMULARIOS
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

  //ANAMNESIS
  iniFormAnamnesis(){
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

  //FONOAUDIOLOGIA
  iniFormFonoaudiologia(){
    let fecha: string;
    let userProfesionalName: any;

    if(!this.newformFonoaudiologia){
      fecha = this._fonoaudiologiaService.fichaFonoaudiologia.fecha;
      userProfesionalName = this._fonoaudiologiaService.fichaFonoaudiologia.user.name
    }else{
      fecha = null;
      userProfesionalName = null;
    }

    this.formFonoaudiologia = this.fb.group({
      fecha: new FormControl({value: fecha, disabled: true}),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      prelinguisticas: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.prelinguisticas),
      prearticulatorias: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.prearticulatorias),
      psicolinguisticas: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.psicolinguisticas),
      foneticoFonologico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.foneticoFonologico),
      semantico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.semantico),
      morfosintactico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.morfosintactico),
      pragmatico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.pragmatico),
      discursoNarrativo: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.discursoNarrativo),
      socialComunicativa: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.socialComunicativa),
    });  

  }
  //GENERAL
  iniFormGeneral(){
    let fecha: string;
    let userProfesionalName: any;

    if(!this.newformGeneral){
      fecha = this._generalService.fichaGeneral.fecha;
      userProfesionalName = this._generalService.fichaGeneral.user.name
    }else{
      fecha = null;
      userProfesionalName = null;
    }
    this.formGeneral = this.fb.group({
      fecha: new FormControl({value: fecha, disabled: true}),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      medicaGeneral: this.fb.group(this._generalService.fichaGeneral.medicaGeneral),

    }); 

  }
  //KINESIOLOGIA
  iniFormKinesiologia(){
    let fecha: string;
    let userProfesionalName: any;

    if(!this.newformKinesiologia){
      fecha = this._kinesiologiaService.fichaKinesiologia.fecha;
      userProfesionalName = this._kinesiologiaService.fichaKinesiologia.user.name
    }else{
      fecha = null;
      userProfesionalName = null;
    }

    this.formKinesiologia = this.fb.group({
      fecha: new FormControl({value: fecha, disabled: true}),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      estabilidadDesplazamiento: this.fb.group(this._kinesiologiaService.fichaKinesiologia.estabilidadDesplazamiento),
      coordinacionDinamica: this.fb.group(this._kinesiologiaService.fichaKinesiologia.coordinacionDinamica),
      conductasPsicomotoras: this.fb.group(this._kinesiologiaService.fichaKinesiologia.conductasPsicomotoras),
      alineacionPostural: this.fb.group(this._kinesiologiaService.fichaKinesiologia.alineacionPostural),

    }); 
  }
  //PSICOLOGIA
  iniFormPsicologia(){
    let fecha: string;
    let userProfesionalName: any;

    if(!this.newformPsicologia){
      fecha = this._psicologiaService.fichaPsicologia.fecha;
      userProfesionalName = this._psicologiaService.fichaPsicologia.user.name
    }else{
      fecha = null;
      userProfesionalName = null;
    }

    this.formPsicologia = this.fb.group({
      fecha: new FormControl({value: fecha, disabled: true}),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      establecerVinculo: this.fb.group(this._psicologiaService.fichaPsicologia.establecerVinculo),
      capacidadesAdaptativas: this.fb.group(this._psicologiaService.fichaPsicologia.capacidadesAdaptativas),
      autoconcepto: this.fb.group(this._psicologiaService.fichaPsicologia.autoconcepto),
      labilidadEmocional: this.fb.group(this._psicologiaService.fichaPsicologia.labilidadEmocional),

    }); 
  }
  //TERAPEUTA
  iniFormTerapeuta(){
    let fecha: string;
    let userProfesionalName: any;

    if(!this.newformTerapeuta){
      fecha = this._terapeutaService.fichaTerapeuta.fecha;
      userProfesionalName = this._terapeutaService.fichaTerapeuta.user.name
    }else{
      fecha = null;
      userProfesionalName = null;
    }

    this.formTerapeuta = this.fb.group({
      fecha: new FormControl({value: fecha, disabled: true}),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      actividadesVidaDiaria: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesVidaDiaria),
      actividadesInstrumentales: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesInstrumentales),
      descansoSueno: this.fb.group(this._terapeutaService.fichaTerapeuta.descansoSueno),
      educacion: this.fb.group(this._terapeutaService.fichaTerapeuta.educacion),
      ocio: this.fb.group(this._terapeutaService.fichaTerapeuta.ocio),
      juego: this.fb.group(this._terapeutaService.fichaTerapeuta.juego),
      participacionSocial: this.fb.group(this._terapeutaService.fichaTerapeuta.participacionSocial),
      transversal: this.fb.group(this._terapeutaService.fichaTerapeuta.transversal),

    }); 
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
