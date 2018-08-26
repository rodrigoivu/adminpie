import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { Anamnesis } from '../../models/anamnesis.model';
import { Fonoaudiologia } from '../../models/fonoaudiologia.model';
import { General } from '../../models/general.model';
import { Kinesiologia } from '../../models/kinesiologia.model';
import { Psicologia } from '../../models/psicologia.model';
import { Terapeuta } from '../../models/terapeuta.model';
import { ProfesionalService, PacienteService, AnamnesisService, FonoaudiologiaService, GeneralService, KinesiologiaService, PsicologiaService, TerapeutaService} from '../../services/service.index';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


interface fechaFicha{
  fecha: string,
  item: number
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
  profesion: string;

  //Flag Indicadores
  pacienteConDatos: boolean=false;

  newformAnamnesis: boolean=false;
  

  //Falg Boton Actualizar
  flgActualizarAnamnesis: boolean=false;
  flgActualizarFonoaudiologia: boolean=false;
  flgActualizarGeneral: boolean=false;
  flgActualizarKinesiologia: boolean=false;
  flgActualizarPsicologia: boolean=false;
  flgActualizarTerapeuta: boolean=false;

  //Falg Boton Crear
  flgCrearAnamnesis: boolean=false;
  flgCrearFonoaudiologia: boolean=false;
  flgCrearGeneral: boolean=false;
  flgCrearKinesiologia: boolean=false;
  flgCrearPsicologia: boolean=false;
  flgCrearTerapeuta: boolean=false;
  

  //FORMULARIOS
  formDatosGenerales: FormGroup;
  formAnamnesis: FormGroup;
  formFonoaudiologia: FormGroup;
  formGeneral: FormGroup;
  formKinesiologia: FormGroup;
  formPsicologia: FormGroup;
  formTerapeuta: FormGroup;
  

  //CONJUNTO DE FICHAS
  fichaAnamnesis: Anamnesis;
  fichasFonoaudiologia:Fonoaudiologia[]=[];
  fichasGeneral:General[]=[];
  fichasKinesiologia:Kinesiologia[]=[];
  fichasPsicologia:Psicologia[]=[];
  fichasTerapeuta:Terapeuta[]=[];


  //POSICIÓN FECHA SELECCIONADA ACTUAL
  posFechaActualFonoaudiologia: number=0;
  posFechaActualGeneral: number=0;
  posFechaActualKinesiologia: number=0;
  posFechaActualPsicologia: number=0;
  posFechaActualTerapeuta: number=0;

  //ULTIMA CONSULTA
  fechaUltimaConsultaAnamnesis: string='';
  fechaUltimaConsultaFonoaudiologia: string='';
  fechaUltimaConsultaGenaral: string='';
  fechaUltimaConsultaKinesiologia: string='';
  fechaUltimaConsultaPsicologia: string='';
  fechaUltimaConsultaTerapeuta: string='';


  profesiones: string[]=['NEUROLOGO', 'FONOAUDIOLOGO', 'KINESILOGO' ,'TERAPEUTA' ,'PSICOLOGO'];

  

  constructor(
       private fb: FormBuilder,
       public _profesionalService: ProfesionalService,
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
    //BUSCA PROFESON DE PROFESIONAL
    this._profesionalService.buscarProfesional(this._idUsuario)
          .subscribe((resp:any) =>{
            //console.log('resp:' + JSON.stringify(resp));
            if (resp){
              this.profesion=resp.profesion;
            }else{
              this.profesion='';
            }
              this.bloqueoInicialBotonesCrear();  
          });
     
   //NOTIFICACION DE CREACION DE FICHA 
    this._anamnesisService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaAnamnesis(this.pacienteEditando._id);
          } );        
    this._fonoaudiologiaService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaFonoaudiologia(this.pacienteEditando._id);
          } );   
    this._generalService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaGeneral(this.pacienteEditando._id);
          } );
    this._kinesiologiaService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaKinesiologia(this.pacienteEditando._id);
          } );  
    this._psicologiaService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaPsicologia(this.pacienteEditando._id);
          } );  
    this._terapeutaService.notificacionNuevaFicha
          .subscribe( resp => {
              this.buscaFichaTerapeuta(this.pacienteEditando._id);
          } );                                
  	
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

      //INICIALIZA FICHA ANAMNESIS
      this.inicializaFormAnamnesis();
      this.buscaFichaAnamnesis(this.pacienteEditando._id);

      //INICIALIZA FICHA FONOAUDIOLOGIA
      this.inicializaFormFonoaudiologia();
      this.buscaFichaFonoaudiologia(this.pacienteEditando._id);

      //INICIALIZA FICHA GENERAL
      this.inicializaFormGeneral();
      this.buscaFichaGeneral(this.pacienteEditando._id);

      //INICIALIZA FICHA KINESIOLOGIA
      this.inicializaFormKinesiologia();
      this.buscaFichaKinesiologia(this.pacienteEditando._id);

      //INICIALIZA FICHA PSICOLOGIA
      this.inicializaFormPsicologia();
      this.buscaFichaPsicologia(this.pacienteEditando._id);

      //INICIALIZA FICHA TERAPEUTA
      this.inicializaFormTerapeuta();
      this.buscaFichaTerapeuta(this.pacienteEditando._id);

      this.onChanges();
    }
    
  }

  onChanges(): void {
    this.formFonoaudiologia.get('fechaName').valueChanges.subscribe( (val:number) => {
      this.setValoresFichaFonoaudiologia(val);
    });

    this.formGeneral.get('fechaName').valueChanges.subscribe( (val:number) => {
      this.setValoresFichaGeneral(val);
    });

    this.formKinesiologia.get('fechaName').valueChanges.subscribe( (val:number) => {
      this.setValoresFichaKinesiologia(val);
    });

    this.formPsicologia.get('fechaName').valueChanges.subscribe( (val:number) => {
      this.setValoresFichaPsicologia(val);
    });

    this.formTerapeuta.get('fechaName').valueChanges.subscribe( (val:number) => {
      this.setValoresFichaTerapeuta(val);
    });
  }

  //CONTROL DE COMPONENTES DEPENDIENTES
  get otroEnfermedadPrePostNatal() { 
    let estado = this.formAnamnesis.get('antecedentesSalud').get('enfermedadesPrePostNatal').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
  }
  get otroEvaluacionEspecialista() { 
    return this.formAnamnesis.get('historialClinico').get('otros').value
  }

  get otroIntervencionQuirurgica() { 
    let estado = this.formAnamnesis.get('historialClinico').get('intervencionQuirurgicaHospitalizaciones').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
  }
  get otroMedicamentos() { 
    let estado = this.formAnamnesis.get('historialClinico').get('medicamentos').value;
    if (estado == 1){
      return true;
    }else{
      return false
    }
  }


  // LISTA DE FECHAS
  get formFonoaudiologiaFechaData() { return <FormArray>this.formFonoaudiologia.get('fechaData'); }
  get formGeneralFechaData() { return <FormArray>this.formGeneral.get('fechaData'); }
  get formKinesiologiaFechaData() { return <FormArray>this.formKinesiologia.get('fechaData'); }
  get formPsicologiaFechaData() { return <FormArray>this.formPsicologia.get('fechaData'); }
  get formTerapeutaFechaData() { return <FormArray>this.formTerapeuta.get('fechaData'); }

  bloqueoInicialBotonesCrear(){

    //this.flgCrearAnamnesis = true;

    let posPro:number = this.profesiones.indexOf(this.profesion);
    switch(posPro) { 
       case 0: { 
          
          this.flgCrearGeneral = true;
          break; 
       } 
       case 1: { 
          this.flgCrearFonoaudiologia = true;
          break; 
       } 
       case 2: { 
          this.flgCrearKinesiologia = true;
          break; 
       } 
       case 3: { 
          this.flgCrearTerapeuta = true;
          break; 
       } 
       case 4: { 
          this.flgCrearPsicologia = true;
          break; 
       } 
       default: { 
          
          break; 
       } 
    } 
  }  

  
  buscaFichaAnamnesis(idPaciente: string){

    this.fichaAnamnesis = null;
    this._anamnesisService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if( resp.anamnesis ){
            //Existe Ficha
            this.flgCrearAnamnesis = false;
            this.fichaAnamnesis = resp.anamnesis;
            this.setValoresFichaAnamnesis();
          }else{
            this.flgCrearAnamnesis = true;
          }
        });
  }

  buscaFichaFonoaudiologia(idPaciente: string){

    this.fichasFonoaudiologia = [];
    this._fonoaudiologiaService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            this.fichasFonoaudiologia = resp.fonoaudiologia;
            this.setFechasFichaFonoaudiologia();
            this.formFonoaudiologia.get('fechaName').setValue(0);
          }
        });
  }

  buscaFichaGeneral(idPaciente: string){

    this.fichasGeneral = [];
    this._generalService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            this.fichasGeneral = resp.general;
            this.setFechasFichaGeneral();
            this.formGeneral.get('fechaName').setValue(0);
          }
        });
  }

  buscaFichaKinesiologia(idPaciente: string){

    this.fichasKinesiologia = [];
    this._kinesiologiaService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            this.fichasKinesiologia = resp.kinesiologia;
            this.setFechasFichaKinesiologia();
            this.formKinesiologia.get('fechaName').setValue(0);
          }
        });
  }

  buscaFichaPsicologia(idPaciente: string){

    this.fichasPsicologia = [];
    this._psicologiaService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            this.fichasPsicologia = resp.psicologia;
            this.setFechasFichaPsicologia();
            this.formPsicologia.get('fechaName').setValue(0);
          }
        });
  }

  buscaFichaTerapeuta(idPaciente: string){

    this.fichasTerapeuta = [];
    this._terapeutaService.cargarFicha(idPaciente)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            this.fichasTerapeuta = resp.terapeuta;
            this.setFechasFichaTerapeuta();
            this.formTerapeuta.get('fechaName').setValue(0);
          }
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
          fechaNacimiento: this.pacienteEditando.fechaNacimiento,
          establecimiento: this.pacienteEditando.establecimiento,
          nivel: this.pacienteEditando.nivel,
          direccion: this.pacienteEditando.direccion,
          fijo: this.pacienteEditando.fijo,
          celular: this.pacienteEditando.celular

      });
    }

  }

 

  inicializaFormAnamnesis(){
    this.formAnamnesis = this.fb.group({
           fecha: new FormControl({value: null, disabled: true}),
           profesional: new FormControl({value: null, disabled: true}),
           antecedentesFamiliares: this.fb.group(this._anamnesisService.fichaAnamnesis.antecedentesFamiliares),
           antecedentesSalud: this.fb.group(this._anamnesisService.fichaAnamnesis.antecedentesSalud),
           historialClinico: this.fb.group(this._anamnesisService.fichaAnamnesis.historialClinico),
           desarrolloEvolutivo: this.fb.group(this._anamnesisService.fichaAnamnesis.desarrolloEvolutivo),
           destrezasSocialesComunicativas: this.fb.group(this._anamnesisService.fichaAnamnesis.destrezasSocialesComunicativas),
           comportamientoLudico: this.fb.group(this._anamnesisService.fichaAnamnesis.comportamientoLudico),
           situacionSocial: this.fb.group(this._anamnesisService.fichaAnamnesis.situacionSocial)
    });
    this.bloqueoAnamnesis();
    this.flgActualizarAnamnesis = false;

  }

  inicializaFormFonoaudiologia(){

    this.formFonoaudiologia = this.fb.group({
          fechaName: new FormControl({value: null}),
          fechaData: this.fb.array([]),
          profesional: new FormControl({value: null, disabled: true}),
          prelinguisticas: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.prelinguisticas),
          prearticulatorias: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.prearticulatorias),
          psicolinguisticas: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.psicolinguisticas),
          foneticoFonologico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.foneticoFonologico),
          semantico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.semantico),
          morfosintactico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.morfosintactico),
          pragmatico: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.pragmatico),
          discursoNarrativo: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.discursoNarrativo),
          socialComunicativa: this.fb.group(this._fonoaudiologiaService.fichaFonoaudiologia.socialComunicativa)
        });  

    this.bloqueoFonoaudiologia();
    this.flgActualizarFonoaudiologia=false;
  }

  inicializaFormGeneral(){

    this.formGeneral = this.fb.group({
      fechaName: new FormControl({value: null}),
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: null, disabled: true}),
      medicaGeneral: this.fb.group(this._generalService.fichaGeneral.medicaGeneral)

    }); 

    this.bloqueoGeneral();
    this.flgActualizarGeneral=false;
  }

  inicializaFormKinesiologia(){

    this.formKinesiologia = this.fb.group({
      fechaName: new FormControl({value: null}),
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: null, disabled: true}),
      estabilidadDesplazamiento: this.fb.group(this._kinesiologiaService.fichaKinesiologia.estabilidadDesplazamiento),
      coordinacionDinamica: this.fb.group(this._kinesiologiaService.fichaKinesiologia.coordinacionDinamica),
      conductasPsicomotoras: this.fb.group(this._kinesiologiaService.fichaKinesiologia.conductasPsicomotoras),
      alineacionPostural: this.fb.group(this._kinesiologiaService.fichaKinesiologia.alineacionPostural)

    });

    this.bloqueoKinesiologia();
    this.flgActualizarKinesiologia=false;
  }

  inicializaFormPsicologia(){

    this.formPsicologia = this.fb.group({
      fechaName: new FormControl({value: null}),
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: null, disabled: true}),
      establecerVinculo: this.fb.group(this._psicologiaService.fichaPsicologia.establecerVinculo),
      capacidadesAdaptativas: this.fb.group(this._psicologiaService.fichaPsicologia.capacidadesAdaptativas),
      autoconcepto: this.fb.group(this._psicologiaService.fichaPsicologia.autoconcepto),
      labilidadEmocional: this.fb.group(this._psicologiaService.fichaPsicologia.labilidadEmocional)
    }); 

    this.bloqueoPsicologia();
    this.flgActualizarPsicologia=false;
  }

  inicializaFormTerapeuta(){

    this.formTerapeuta = this.fb.group({
      fechaName: new FormControl({value: null}),
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: null, disabled: true}),
      actividadesVidaDiaria: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesVidaDiaria),
      actividadesInstrumentales: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesInstrumentales),
      descansoSueno: this.fb.group(this._terapeutaService.fichaTerapeuta.descansoSueno),
      educacion: this.fb.group(this._terapeutaService.fichaTerapeuta.educacion),
      ocio: this.fb.group(this._terapeutaService.fichaTerapeuta.ocio),
      juego: this.fb.group(this._terapeutaService.fichaTerapeuta.juego),
      participacionSocial: this.fb.group(this._terapeutaService.fichaTerapeuta.participacionSocial),
      transversal: this.fb.group(this._terapeutaService.fichaTerapeuta.transversal)
    }); 

    this.bloqueoTerapeuta();
    this.flgActualizarTerapeuta=false;
  }

  setFechasFichaFonoaudiologia(){

    this.formFonoaudiologia.get('fechaData').reset();
    let items = this.formFonoaudiologia.get('fechaData') as FormArray;

    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasFonoaudiologia ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          };
          items.push(this.fb.group(fecFicha));
          i++;
    }
  }

  setFechasFichaGeneral(){

    this.formGeneral.get('fechaData').reset();
    let items = this.formGeneral.get('fechaData') as FormArray;

    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasGeneral ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          };
          items.push(this.fb.group(fecFicha));
          i++;
    }
  }

  setFechasFichaKinesiologia(){

    this.formKinesiologia.get('fechaData').reset();
    let items = this.formKinesiologia.get('fechaData') as FormArray;

    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasKinesiologia ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          };
          items.push(this.fb.group(fecFicha));
          i++;
    }
  }

  setFechasFichaPsicologia(){

    this.formPsicologia.get('fechaData').reset();
    let items = this.formPsicologia.get('fechaData') as FormArray;

    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasPsicologia ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          };
          items.push(this.fb.group(fecFicha));
          i++;
    }
  }

  setFechasFichaTerapeuta(){

    this.formTerapeuta.get('fechaData').reset();
    let items = this.formTerapeuta.get('fechaData') as FormArray;

    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasTerapeuta ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          };
          items.push(this.fb.group(fecFicha));
          i++;
    }
  }

  setValoresFichaAnamnesis(){
      this.fechaUltimaConsultaAnamnesis = 'Última consulta:'+this.fichaAnamnesis.fecha;

      this.formAnamnesis.get('fecha').setValue(this.fichaAnamnesis.fecha);
      this.formAnamnesis.get('profesional').setValue(this.fichaAnamnesis.user.name);
      this.formAnamnesis.get('antecedentesFamiliares').setValue(this.fichaAnamnesis.antecedentesFamiliares);
      this.formAnamnesis.get('antecedentesSalud').setValue(this.fichaAnamnesis.antecedentesSalud);
      this.formAnamnesis.get('historialClinico').setValue(this.fichaAnamnesis.historialClinico);
      this.formAnamnesis.get('desarrolloEvolutivo').setValue(this.fichaAnamnesis.desarrolloEvolutivo);
      this.formAnamnesis.get('destrezasSocialesComunicativas').setValue(this.fichaAnamnesis.destrezasSocialesComunicativas);
      this.formAnamnesis.get('comportamientoLudico').setValue(this.fichaAnamnesis.comportamientoLudico);
      this.formAnamnesis.get('situacionSocial').setValue(this.fichaAnamnesis.situacionSocial);

      this.estadoBloqueoAnamnesis();
     
  }

  setValoresFichaFonoaudiologia(idFecha:number){
      this.fechaUltimaConsultaFonoaudiologia = 'Última consulta:'+this.fichasFonoaudiologia[idFecha].fecha;

      this.formFonoaudiologia.get('profesional').setValue(this.fichasFonoaudiologia[idFecha].user.name);
      this.formFonoaudiologia.get('prelinguisticas').setValue(this.fichasFonoaudiologia[idFecha].prelinguisticas);
      this.formFonoaudiologia.get('prearticulatorias').setValue(this.fichasFonoaudiologia[idFecha].prearticulatorias);
      this.formFonoaudiologia.get('psicolinguisticas').setValue(this.fichasFonoaudiologia[idFecha].psicolinguisticas);
      this.formFonoaudiologia.get('foneticoFonologico').setValue(this.fichasFonoaudiologia[idFecha].foneticoFonologico);
      this.formFonoaudiologia.get('semantico').setValue(this.fichasFonoaudiologia[idFecha].semantico);
      this.formFonoaudiologia.get('morfosintactico').setValue(this.fichasFonoaudiologia[idFecha].morfosintactico);
      this.formFonoaudiologia.get('pragmatico').setValue(this.fichasFonoaudiologia[idFecha].pragmatico);
      this.formFonoaudiologia.get('discursoNarrativo').setValue(this.fichasFonoaudiologia[idFecha].discursoNarrativo);
      this.formFonoaudiologia.get('socialComunicativa').setValue(this.fichasFonoaudiologia[idFecha].socialComunicativa);

      this.estadoBloqueoFonoaudiologia(idFecha);
     
  }

  setValoresFichaGeneral(idFecha:number){
      this.fechaUltimaConsultaGenaral = 'Última consulta:'+this.fichasGeneral[idFecha].fecha;
      
      this.formGeneral.get('profesional').setValue(this.fichasGeneral[idFecha].user.name);
      this.formGeneral.get('medicaGeneral').setValue(this.fichasGeneral[idFecha].medicaGeneral);

      this.estadoBloqueoGeneral(idFecha);
     
  }

  setValoresFichaKinesiologia(idFecha:number){
      this.fechaUltimaConsultaKinesiologia = 'Última consulta:'+this.fichasKinesiologia[idFecha].fecha;
      
      this.formKinesiologia.get('profesional').setValue(this.fichasKinesiologia[idFecha].user.name);
      this.formKinesiologia.get('estabilidadDesplazamiento').setValue(this.fichasKinesiologia[idFecha].estabilidadDesplazamiento);
      this.formKinesiologia.get('coordinacionDinamica').setValue(this.fichasKinesiologia[idFecha].coordinacionDinamica);
      this.formKinesiologia.get('conductasPsicomotoras').setValue(this.fichasKinesiologia[idFecha].conductasPsicomotoras);
      this.formKinesiologia.get('alineacionPostural').setValue(this.fichasKinesiologia[idFecha].alineacionPostural);     

      this.estadoBloqueoKinesiologia(idFecha);
     
  }

  setValoresFichaPsicologia(idFecha:number){
      this.fechaUltimaConsultaPsicologia = 'Última consulta:'+this.fichasPsicologia[idFecha].fecha;

      this.formPsicologia.get('profesional').setValue(this.fichasPsicologia[idFecha].user.name);
      this.formPsicologia.get('establecerVinculo').setValue(this.fichasPsicologia[idFecha].establecerVinculo);
      this.formPsicologia.get('capacidadesAdaptativas').setValue(this.fichasPsicologia[idFecha].capacidadesAdaptativas);
      this.formPsicologia.get('autoconcepto').setValue(this.fichasPsicologia[idFecha].autoconcepto);
      this.formPsicologia.get('labilidadEmocional').setValue(this.fichasPsicologia[idFecha].labilidadEmocional);

      this.estadoBloqueoPsicologia(idFecha);
     
  }

  setValoresFichaTerapeuta(idFecha:number){
      this.fechaUltimaConsultaTerapeuta = 'Última consulta:'+this.fichasTerapeuta[idFecha].fecha;

      this.formTerapeuta.get('profesional').setValue(this.fichasTerapeuta[idFecha].user.name);
      this.formTerapeuta.get('actividadesVidaDiaria').setValue(this.fichasTerapeuta[idFecha].actividadesVidaDiaria);
      this.formTerapeuta.get('actividadesInstrumentales').setValue(this.fichasTerapeuta[idFecha].actividadesInstrumentales);
      this.formTerapeuta.get('descansoSueno').setValue(this.fichasTerapeuta[idFecha].descansoSueno);
      this.formTerapeuta.get('educacion').setValue(this.fichasTerapeuta[idFecha].educacion);
      this.formTerapeuta.get('ocio').setValue(this.fichasTerapeuta[idFecha].ocio);
      this.formTerapeuta.get('juego').setValue(this.fichasTerapeuta[idFecha].juego);
      this.formTerapeuta.get('participacionSocial').setValue(this.fichasTerapeuta[idFecha].participacionSocial);
      this.formTerapeuta.get('transversal').setValue(this.fichasTerapeuta[idFecha].transversal);

      this.estadoBloqueoTerapeuta(idFecha);
     
  }

  estadoBloqueoAnamnesis(){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichaAnamnesis.fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        this.desBloqueoAnamnesis();
        this.flgActualizarAnamnesis=true;
      }else{
         this.bloqueoFonoaudiologia();
         this.flgActualizarAnamnesis=false;
      }
  }

  estadoBloqueoFonoaudiologia(idFecha:number){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichasFonoaudiologia[idFecha].fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        if ( this.profesiones.indexOf(this.profesion) == 1 ){
            this.desBloqueoFonoaudiologia();
            this.flgActualizarFonoaudiologia=true;
        }else{
            this.bloqueoFonoaudiologia();
            this.flgActualizarFonoaudiologia=false;
        }

      }else{
         this.bloqueoFonoaudiologia();
         this.flgActualizarFonoaudiologia=false;
      }
  }

  estadoBloqueoGeneral(idFecha:number){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichasGeneral[idFecha].fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        if ( this.profesiones.indexOf(this.profesion) == 0 ){
            this.desBloqueoGeneral();
            this.flgActualizarGeneral=true;
        }else{
            this.bloqueoGeneral();
            this.flgActualizarGeneral=false;
        }

      }else{
         this.bloqueoGeneral();
         this.flgActualizarGeneral=false;
      }
  }

  estadoBloqueoKinesiologia(idFecha:number){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichasKinesiologia[idFecha].fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        if ( this.profesiones.indexOf(this.profesion) == 2 ){
            this.desBloqueoKinesiologia();
            this.flgActualizarKinesiologia=true;
        }else{
            this.bloqueoKinesiologia();
            this.flgActualizarKinesiologia=false;
        }

      }else{
         this.bloqueoKinesiologia();
         this.flgActualizarKinesiologia=false;
      }
  }

  estadoBloqueoPsicologia(idFecha:number){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichasPsicologia[idFecha].fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        if ( this.profesiones.indexOf(this.profesion) == 4 ){
            this.desBloqueoPsicologia();
            this.flgActualizarPsicologia=true;
        }else{
            this.bloqueoPsicologia();
            this.flgActualizarPsicologia=false;
        }

      }else{
         this.bloqueoPsicologia();
         this.flgActualizarPsicologia=false;
      }
  }

  estadoBloqueoTerapeuta(idFecha:number){
      let esFechaHoy: boolean=false;
      let fechaConsultada: string = this.fichasTerapeuta[idFecha].fecha;

      if(fechaConsultada!=null){
          esFechaHoy=this.esHoy(fechaConsultada);
      }else{
          esFechaHoy=false;
      }
      

      if(esFechaHoy){
        if ( this.profesiones.indexOf(this.profesion) == 3 ){
            this.desBloqueoTerapeuta();
            this.flgActualizarTerapeuta=true;
        }else{
            this.bloqueoTerapeuta();
            this.flgActualizarTerapeuta=false;
        }

      }else{
         this.bloqueoTerapeuta();
         this.flgActualizarTerapeuta=false;
      }
  }

  
  
  actualizaFichaAnamnesis(){
    let registro: Anamnesis;
    let fecha: string;

      fecha = this.fichaAnamnesis.fecha;
      registro = new Anamnesis(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formAnamnesis.value.antecedentesFamiliares,
            this.formAnamnesis.value.antecedentesSalud,
            this.formAnamnesis.value.historialClinico,
            this.formAnamnesis.value.desarrolloEvolutivo,
            this.formAnamnesis.value.destrezasSocialesComunicativas,
            this.formAnamnesis.value.comportamientoLudico,
            this.formAnamnesis.value.situacionSocial
      );

      this._anamnesisService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichaAnamnesis = registro;
          });

  }

  actualizaFichaFonoaudiologia(){
    let registro: Fonoaudiologia;
    let fecha: string;
    let idfecha: number = this.formFonoaudiologia.value.fechaName;

    if(idfecha>=0){
      fecha = this.fichasFonoaudiologia[idfecha].fecha;
      registro = new Fonoaudiologia(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formFonoaudiologia.value.prelinguisticas,
            this.formFonoaudiologia.value.prearticulatorias,
            this.formFonoaudiologia.value.psicolinguisticas,
            this.formFonoaudiologia.value.foneticoFonologico,
            this.formFonoaudiologia.value.semantico,
            this.formFonoaudiologia.value.morfosintactico,
            this.formFonoaudiologia.value.pragmatico,
            this.formFonoaudiologia.value.discursoNarrativo,
            this.formFonoaudiologia.value.socialComunicativa
      );

      this._fonoaudiologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichasFonoaudiologia[idfecha]=registro;
          });
    }

  }

  actualizaFichaGeneral(){
    let registro: General;
    let fecha: string;
    let idfecha: number = this.formGeneral.value.fechaName;

    if(idfecha>=0){
      fecha = this.fichasGeneral[idfecha].fecha;
      registro = new General(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formGeneral.value.medicaGeneral
            
      );

      this._generalService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichasGeneral[idfecha]=registro;
          });
    }

  }

  actualizaFichaKinesiologia(){
    let registro: Kinesiologia;
    let fecha: string;
    let idfecha: number = this.formKinesiologia.value.fechaName;

    if(idfecha>=0){
      fecha = this.fichasKinesiologia[idfecha].fecha;
      registro = new Kinesiologia(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formKinesiologia.value.estabilidadDesplazamiento,
            this.formKinesiologia.value.coordinacionDinamica,
            this.formKinesiologia.value.conductasPsicomotoras,
            this.formKinesiologia.value.alineacionPostural
            
      );

      this._kinesiologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichasKinesiologia[idfecha]=registro;
          });
    }

  }

  actualizaFichaPsicologia(){
    let registro: Psicologia;
    let fecha: string;
    let idfecha: number = this.formPsicologia.value.fechaName;

    if(idfecha>=0){
      fecha = this.fichasPsicologia[idfecha].fecha;
      registro = new Psicologia(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formPsicologia.value.establecerVinculo,
            this.formPsicologia.value.capacidadesAdaptativas,
            this.formPsicologia.value.autoconcepto,
            this.formPsicologia.value.labilidadEmocional
           
      );

      this._psicologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichasPsicologia[idfecha]=registro;
          });
    }

  }

  actualizaFichaTerapeuta(){
    let registro: Terapeuta;
    let fecha: string;
    let idfecha: number = this.formTerapeuta.value.fechaName;

    if(idfecha>=0){
      fecha = this.fichasTerapeuta[idfecha].fecha;
      registro = new Terapeuta(
            this.pacienteEditando._id,
            this._idUsuario,
            fecha,
            this.formTerapeuta.value.actividadesVidaDiaria,
            this.formTerapeuta.value.actividadesInstrumentales,
            this.formTerapeuta.value.descansoSueno,
            this.formTerapeuta.value.educacion,
            this.formTerapeuta.value.ocio,
            this.formTerapeuta.value.juego,
            this.formTerapeuta.value.participacionSocial,
            this.formTerapeuta.value.transversal
           
      );

      this._terapeutaService.actualizarFicha(registro)
          .subscribe(resp =>{
              this.fichasTerapeuta[idfecha]=registro;
          });
    }

  }

  crearFichaAnamnesis(){
    if(this.fichaAnamnesis){
        swal( 'Error', 'Ya existe una Ficha de Anamnesis para este paciente', 'error');
        return;
    }

      this._anamnesisService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }

  crearFichaFonoaudiologia(){

      if(this.fichasFonoaudiologia.length > 0){
        let fecha:string = this.fichasFonoaudiologia[0].fecha;
        if (this.esHoy(fecha)){
          swal( 'Error', 'Ya existe una Ficha para hoy '+fecha, 'error');
          return;
        }
      }

      this._fonoaudiologiaService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }

  crearFichaGeneral(){
      if(this.fichasGeneral.length > 0){
        let fecha:string = this.fichasGeneral[0].fecha;
        if (this.esHoy(fecha)){
          swal( 'Error', 'Ya existe una Ficha para hoy '+fecha, 'error');
          return;
        }
      }

      this._generalService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }

  crearFichaKinesiologia(){
      if(this.fichasKinesiologia.length > 0){
        let fecha:string = this.fichasKinesiologia[0].fecha;
        if (this.esHoy(fecha)){
          swal( 'Error', 'Ya existe una Ficha para hoy '+fecha, 'error');
          return;
        }
      }

      this._kinesiologiaService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }

  crearFichaPsicologia(){
      if(this.fichasFonoaudiologia.length > 0){
        let fecha:string = this.fichasFonoaudiologia[0].fecha;
        if (this.esHoy(fecha)){
          swal( 'Error', 'Ya existe una Ficha para hoy '+fecha, 'error');
          return;
        }
      }

      this._fonoaudiologiaService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }

  crearFichaTerapeuta(){
      if(this.fichasFonoaudiologia.length > 0){
        let fecha:string = this.fichasFonoaudiologia[0].fecha;
        if (this.esHoy(fecha)){
          swal( 'Error', 'Ya existe una Ficha para hoy '+fecha, 'error');
          return;
        }
      }

      this._fonoaudiologiaService.registraFicha(this.pacienteEditando._id,this._idUsuario);
  }
  
  bloqueoAnamnesis(){
    this.formAnamnesis.disable({ emitEvent: false });
  }

 
  bloqueoFonoaudiologia(){

    this.formFonoaudiologia.disable({ emitEvent: false });
    this.formFonoaudiologia.get('fechaName').enable({ emitEvent: false });
    
  }

  bloqueoGeneral(){
    this.formGeneral.disable({ emitEvent: false });
    this.formGeneral.get('fechaName').enable({ emitEvent: false });
  }

  bloqueoKinesiologia(){
    this.formKinesiologia.disable({ emitEvent: false });
    this.formKinesiologia.get('fechaName').enable({ emitEvent: false });
  }

  bloqueoPsicologia(){
    this.formPsicologia.disable({ emitEvent: false });
    this.formPsicologia.get('fechaName').enable({ emitEvent: false });
  }

  bloqueoTerapeuta(){
    this.formTerapeuta.disable({ emitEvent: false });
    this.formTerapeuta.get('fechaName').enable({ emitEvent: false });
  }

  desBloqueoAnamnesis(){
    this.formAnamnesis.enable({ emitEvent: false });
    this.formAnamnesis.get('fecha').disable({ emitEvent: false });
    this.formAnamnesis.get('profesional').disable({ emitEvent: false });
  }

  desBloqueoFonoaudiologia(){
    this.formFonoaudiologia.enable({ emitEvent: false });
    this.formFonoaudiologia.get('profesional').disable({ emitEvent: false });

  }

  desBloqueoGeneral(){
    this.formGeneral.enable({ emitEvent: false });
    this.formGeneral.get('profesional').disable({ emitEvent: false });
  }

  desBloqueoKinesiologia(){
    this.formKinesiologia.enable({ emitEvent: false });
    this.formKinesiologia.get('profesional').disable({ emitEvent: false });
  }

  desBloqueoPsicologia(){
    this.formPsicologia.enable({ emitEvent: false });
    this.formPsicologia.get('profesional').disable({ emitEvent: false });
  }

  desBloqueoTerapeuta(){
    this.formTerapeuta.enable({ emitEvent: false });
    this.formTerapeuta.get('profesional').disable({ emitEvent: false });
  }

  esHoy(fecha: string): boolean{
      let my = new Date();
      let dia: number =my.getDate();
      let mes: number =my.getMonth()+1;
      let ano: number =my.getFullYear();
      let fechaHoy:string =  dia+'-'+  mes + '-'+ ano;
      let regex = new RegExp(fechaHoy, 'i');
      if( fecha !=null)
        if (fecha.match(regex)){
          return true;
        }else{
          return false;
        }
      else{
        return true;
      }  
    
  }

}
