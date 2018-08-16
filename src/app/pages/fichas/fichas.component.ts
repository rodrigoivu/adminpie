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

interface NgbDate {
  day: number,
  month: number,
  year: number
}

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
  

  //CONJUNTO DE FICHAS
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
    this._profesionalService.buscarProfesional(this._idUsuario)
          .subscribe((resp:any) =>{
            //console.log('resp:' + JSON.stringify(resp));
            if (resp){
              this.profesion=resp.profesion;
            }else{
              this.profesion='';
            }
          });
  	
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

  // LISTA DE FECHAS
  get formFonoaudiologiaFechaData() { return <FormArray>this.formFonoaudiologia.get('fechaData'); }
  get formGeneralFechaData() { return <FormArray>this.formGeneral.get('fechaData'); }
  get formKinesiologiaFechaData() { return <FormArray>this.formKinesiologia.get('fechaData'); }
  get formPsicologiaFechaData() { return <FormArray>this.formPsicologia.get('fechaData'); }
  get formTerapeutaFechaData() { return <FormArray>this.formTerapeuta.get('fechaData'); }

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
    
    let i:number;
    this._fonoaudiologiaService.cargarFicha(id)
        .subscribe( (resp: any) => {

          if(resp.total != 0 ){
            //Existe Ficha
            
            i=this.posFechaActualFonoaudiologia;
            this.fichasFonoaudiologia = resp.fonoaudiologia;
            this._fonoaudiologiaService.fichaFonoaudiologia=this.fichasFonoaudiologia[i];
            // for( let fi of this.fichasFonoaudiologia ){
              
            // }
            this.newformFonoaudiologia=false;
            
          }else{
            //No hay ficha hay que crearla
            i=0;
            this.fichasFonoaudiologia = [];
            this.newformFonoaudiologia=true;
            this._fonoaudiologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormFonoaudiologia(i,false);
          
     });
  }
  buscarFichaGeneral(id: string){
    let i:number;
    this._generalService.cargarFicha(id)
        .subscribe((resp: any) => {
          if(resp.total != 0 ){
            //Existe Ficha

            i=this.posFechaActualGeneral;
            this.fichasGeneral = resp.general;
            this._generalService.fichaGeneral=this.fichasGeneral[i];

            this.newformGeneral=false;
            
          }else{
            //No hay ficha hay que crearla
            i=0;
            this.fichasGeneral = [];
            this.newformGeneral=true;
            this._generalService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormGeneral(i);
          
     });
  }
  buscarFichaKinesiologia(id: string){
    let i:number;
    this._kinesiologiaService.cargarFicha(id)
        .subscribe((resp: any) => {
          if(resp.total != 0 ){
            //Existe Ficha
            i=this.posFechaActualKinesiologia;
            this.fichasKinesiologia = resp.kinesiologia;
            this._kinesiologiaService.fichaKinesiologia=this.fichasKinesiologia[i];

            this.newformKinesiologia=false;
            
          }else{
            //No hay ficha hay que crearla
            i=0;
            this.fichasKinesiologia = [];
            this.newformKinesiologia=true;
            this._kinesiologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormKinesiologia(i);
          
     });
  }
  buscarFichaPsicologia(id: string){
    let i:number;
    this._psicologiaService.cargarFicha(id)
        .subscribe((resp: any) => {
          if(resp.total != 0 ){
            //Existe Ficha
            i=this.posFechaActualPsicologia;
            this.fichasPsicologia = resp.psicologia;
            this._psicologiaService.fichaPsicologia=this.fichasPsicologia[i];

            this.newformPsicologia=false;
            
          }else{
            //No hay ficha hay que crearla
            i=0;
            this.fichasPsicologia = [];
            this.newformPsicologia=true;
            this._psicologiaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormPsicologia(i);
          
     });
  }
  buscarFichaTerapeuta(id: string){
    let i:number;
    this._terapeutaService.cargarFicha(id)
        .subscribe((resp: any) => {
          if(resp.total != 0 ){
            //Existe Ficha
            i=this.posFechaActualTerapeuta;
            this.fichasTerapeuta = resp.terapeuta;
            this._terapeutaService.fichaTerapeuta=this.fichasTerapeuta[i];

            this.newformTerapeuta=false;
            
          }else{
            //No hay ficha hay que crearla
            i=0;
            this.fichasTerapeuta = [];
            this.newformTerapeuta=true;
            this._terapeutaService.inicializaFicha();
          }
         //Inicializa Formulario
          this.iniFormTerapeuta(i);
          
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
   
    //BLOQUEAR
    //Si no es profesional se bloquea
    if (this.profesiones.indexOf(this.profesion) < 0){
        this.bloqueoAnamnesis();
    }else{
        this.desBloqueoAnamnesis();
    }
    
  }

  //FONOAUDIOLOGIA
  iniFormFonoaudiologia(idFecha:number, setValor:boolean){
    //let fecha: string;
    let fechaN: number;
    let userProfesionalName: any;

    if(!this.newformFonoaudiologia){  // si existe
      fechaN = idFecha;
      //fecha = this._fonoaudiologiaService.fichaFonoaudiologia.fecha;
      userProfesionalName = this._fonoaudiologiaService.fichaFonoaudiologia.user.name
    }else{
      fechaN = null;
      //fecha = null;
      userProfesionalName = null;
    }

    if (!setValor){
        this.formFonoaudiologia = this.fb.group({
          fechaName: fechaN,
          fechaData: this.fb.array([]),
          profesional: new FormControl({value: userProfesionalName, disabled: true}),
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

        //CARGAR LAS FECHAS HISTORICAS DE FICHAS
        this.formFonoaudiologia.get('fechaData').reset();
        let items = this.formFonoaudiologia.get('fechaData') as FormArray;
        let fecFicha: fechaFicha;
        let i:number=0;
        for( let ficha of this.fichasFonoaudiologia ){

          fecFicha={
               fecha: ficha.fecha,
               item:i
          } 
          items.push(this.fb.group(fecFicha));

          i++;
        }
       
    }else{
      console.log('setvalores');
      this.formFonoaudiologia.get('fechaName').setValue(fechaN);
      this.formFonoaudiologia.get('profesional').setValue(userProfesionalName);
      this.formFonoaudiologia.get('prelinguisticas').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.prelinguisticas);
      this.formFonoaudiologia.get('prearticulatorias').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.prearticulatorias);
      this.formFonoaudiologia.get('psicolinguisticas').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.psicolinguisticas);
      this.formFonoaudiologia.get('foneticoFonologico').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.foneticoFonologico);
      this.formFonoaudiologia.get('semantico').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.semantico);
      this.formFonoaudiologia.get('morfosintactico').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.morfosintactico);
      this.formFonoaudiologia.get('pragmatico').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.pragmatico);
      this.formFonoaudiologia.get('discursoNarrativo').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.discursoNarrativo);
      this.formFonoaudiologia.get('socialComunicativa').setValue(this._fonoaudiologiaService.fichaFonoaudiologia.socialComunicativa);
    } 


    

    //BLOQUEAR
    let esFechaHoy: boolean=false;
    let fechaConsultada: string = this._fonoaudiologiaService.fichaFonoaudiologia.fecha;
    esFechaHoy=this.esHoy(fechaConsultada);

    //Compara fecha consulta con fecha actual
    console.log(esFechaHoy);
    if(esFechaHoy){
      if ( this.profesiones.indexOf(this.profesion) == 1 ){
          console.log('desbloquear');
          this.desBloqueoFonoaudiologia();
          
      }else{
           
          console.log('bloquear');
          this.bloqueoFonoaudiologia();
          
      }

    }else{
        console.log('bloquear');
       this.bloqueoFonoaudiologia();
       
    }
     
    


  }
  //GENERAL
  iniFormGeneral(idFecha:number){
    let fechaN: number;
    let userProfesionalName: any;

    if(!this.newformGeneral){
      fechaN = idFecha;
      userProfesionalName = this._generalService.fichaGeneral.user.name
    }else{
      fechaN = null;
      userProfesionalName = null;
    }
    this.formGeneral = this.fb.group({
      fechaName: fechaN,
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      medicaGeneral: this.fb.group(this._generalService.fichaGeneral.medicaGeneral)

    }); 

    //CARGAR LAS FECHAS HISTORICAS DE FICHAS
    this.formGeneral.get('fechaData').reset();
    let items = this.formGeneral.get('fechaData') as FormArray;
    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasGeneral ){

      fecFicha={
           fecha: ficha.fecha,
           item:i
      } 
      items.push(this.fb.group(fecFicha));

      i++;
    }

    //BLOQUEAR
    let esFechaHoy: boolean=false;
    let fechaConsultada: string = this._generalService.fichaGeneral.fecha;
    esFechaHoy=this.esHoy(fechaConsultada);

    //Compara fecha consulta con fecha actual
    //console.log(esFechaHoy);
    if(esFechaHoy){
        if (this.profesiones.indexOf(this.profesion) == 0){
          this.desBloqueoGeneral();
        }else{
          this.bloqueoGeneral();
        }
    }else{
       this.bloqueoGeneral();
    }

    

  }
  //KINESIOLOGIA
  iniFormKinesiologia(idFecha:number){
    let fechaN: number;
    let userProfesionalName: any;

    if(!this.newformKinesiologia){
      fechaN = idFecha;
      userProfesionalName = this._kinesiologiaService.fichaKinesiologia.user.name
    }else{
      fechaN = null;
      userProfesionalName = null;
    }

    this.formKinesiologia = this.fb.group({
      fechaName: fechaN,
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      estabilidadDesplazamiento: this.fb.group(this._kinesiologiaService.fichaKinesiologia.estabilidadDesplazamiento),
      coordinacionDinamica: this.fb.group(this._kinesiologiaService.fichaKinesiologia.coordinacionDinamica),
      conductasPsicomotoras: this.fb.group(this._kinesiologiaService.fichaKinesiologia.conductasPsicomotoras),
      alineacionPostural: this.fb.group(this._kinesiologiaService.fichaKinesiologia.alineacionPostural)

    }); 

    //CARGAR LAS FECHAS HISTORICAS DE FICHAS
    this.formKinesiologia.get('fechaData').reset();
    let items = this.formKinesiologia.get('fechaData') as FormArray;
    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasKinesiologia ){

      fecFicha={
           fecha: ficha.fecha,
           item:i
      } 
      items.push(this.fb.group(fecFicha));

      i++;
    }

    //BLOQUEAR
    if (this.profesiones.indexOf(this.profesion) == 2){
        this.desBloqueoKinesiologia();
    }else{
        this.bloqueoKinesiologia();
    }

  }
  //PSICOLOGIA
  iniFormPsicologia(idFecha:number){
    let fechaN: number;
    let userProfesionalName: any;

    if(!this.newformPsicologia){
      fechaN = idFecha;
      userProfesionalName = this._psicologiaService.fichaPsicologia.user.name
    }else{
      fechaN = null;
      userProfesionalName = null;
    }

    this.formPsicologia = this.fb.group({
      fechaName: fechaN,
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      establecerVinculo: this.fb.group(this._psicologiaService.fichaPsicologia.establecerVinculo),
      capacidadesAdaptativas: this.fb.group(this._psicologiaService.fichaPsicologia.capacidadesAdaptativas),
      autoconcepto: this.fb.group(this._psicologiaService.fichaPsicologia.autoconcepto),
      labilidadEmocional: this.fb.group(this._psicologiaService.fichaPsicologia.labilidadEmocional)

    }); 

    //CARGAR LAS FECHAS HISTORICAS DE FICHAS
    this.formPsicologia.get('fechaData').reset();
    let items = this.formPsicologia.get('fechaData') as FormArray;
    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasPsicologia ){

      fecFicha={
           fecha: ficha.fecha,
           item:i
      } 
      items.push(this.fb.group(fecFicha));

      i++;
    }

    //BLOQUEAR
    if (this.profesiones.indexOf(this.profesion) == 4){
        this.desBloqueoPsicologia();
    }else{
        this.bloqueoPsicologia();
    }

  }
  //TERAPEUTA
  iniFormTerapeuta(idFecha:number){
    let fechaN: number;
    let userProfesionalName: any;

    if(!this.newformTerapeuta){
      fechaN = idFecha;
      userProfesionalName = this._terapeutaService.fichaTerapeuta.user.name
    }else{
      fechaN = null;
      userProfesionalName = null;
    }


    this.formTerapeuta = this.fb.group({
      fechaName: fechaN,
      fechaData: this.fb.array([]),
      profesional: new FormControl({value: userProfesionalName, disabled: true}),
      actividadesVidaDiaria: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesVidaDiaria),
      actividadesInstrumentales: this.fb.group(this._terapeutaService.fichaTerapeuta.actividadesInstrumentales),
      descansoSueno: this.fb.group(this._terapeutaService.fichaTerapeuta.descansoSueno),
      educacion: this.fb.group(this._terapeutaService.fichaTerapeuta.educacion),
      ocio: this.fb.group(this._terapeutaService.fichaTerapeuta.ocio),
      juego: this.fb.group(this._terapeutaService.fichaTerapeuta.juego),
      participacionSocial: this.fb.group(this._terapeutaService.fichaTerapeuta.participacionSocial),
      transversal: this.fb.group(this._terapeutaService.fichaTerapeuta.transversal)

    }); 
    

    //CARGAR LAS FECHAS HISTORICAS DE FICHAS
    this.formTerapeuta.get('fechaData').reset();
    let items = this.formTerapeuta.get('fechaData') as FormArray;
    let fecFicha: fechaFicha;
    let i:number=0;
    for( let ficha of this.fichasTerapeuta ){

      fecFicha={
           fecha: ficha.fecha,
           item:i
      } 
      items.push(this.fb.group(fecFicha));

      i++;
    }

    //BLOQUEAR
    if (this.profesiones.indexOf(this.profesion) == 3){
        this.desBloqueoTerapeuta();
    }else{
        this.bloqueoTerapeuta();
    }
  }

  //SELECCIONAR OTRA FECHA
  otraFechaFonoaudiologia(){

    let i: number;
    i=this.formFonoaudiologia.value.fechaName;
    this.posFechaActualFonoaudiologia=i;
    if(!this.newformFonoaudiologia){
      this._fonoaudiologiaService.fichaFonoaudiologia = this.fichasFonoaudiologia[i];
      this.iniFormFonoaudiologia(i,true);
      
    }

  }

  otraFechaGeneral(){
    let i: number;
    i=this.formGeneral.value.fechaName;
    this.posFechaActualGeneral=i;
    if(!this.newformGeneral){
      this._generalService.fichaGeneral = this.fichasGeneral[i];
      this.iniFormGeneral(i);
    }

  }

  otraFechaKinesiologia(){
    let i: number;
    i=this.formKinesiologia.value.fechaName;
    this.posFechaActualKinesiologia=i;
    if(!this.newformKinesiologia){
      this._kinesiologiaService.fichaKinesiologia = this.fichasKinesiologia[i];
      this.iniFormKinesiologia(i);
    }

  }

  otraFechaPsicologia(){
    let i: number;
    i=this.formPsicologia.value.fechaName;
    this.posFechaActualPsicologia=i;
    if(!this.newformPsicologia){
      this._psicologiaService.fichaPsicologia = this.fichasPsicologia[i];
      this.iniFormPsicologia(i);
    }

  }

  otraFechaTerapeuta(){
    let i: number;
    i=this.formTerapeuta.value.fechaName;
    this.posFechaActualTerapeuta=i;
    if(!this.newformTerapeuta){
      this._terapeutaService.fichaTerapeuta = this.fichasTerapeuta[i];
      this.iniFormTerapeuta(i);
    }

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
  registrarFonoaudiologia(){
    let registro: Fonoaudiologia;
    let my = new Date();
    let dia: number;
    let mes: number;
    let ano: number;
    let fecha: string;

    if(!this.newformFonoaudiologia){
      //Ya existe entonces Actualizar
       fecha = this._fonoaudiologiaService.fichaFonoaudiologia.fecha;
       

    }else{
      //CREAR FICHA
       dia =my.getDate();
       mes =my.getMonth()+1;
       ano =my.getFullYear();
       fecha =  dia+'-'+  mes + '-'+ ano;

    }

    // FALTA VERIFICAR POR ROLE
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

    if(!this.newformFonoaudiologia){
      //Ya existe entonces Actualizar

      this._fonoaudiologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaFonoaudiologia( this.pacienteEditando._id );
          });

    }else{

      this._fonoaudiologiaService.crearFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaFonoaudiologia( this.pacienteEditando._id );
          });
    }
    
  }
  registrarGeneral(){
    let registro: General;
    let my = new Date();
    let dia: number;
    let mes: number;
    let ano: number;
    let fecha: string;

    if(!this.newformGeneral){
      //Ya existe entonces Actualizar
       fecha = this._generalService.fichaGeneral.fecha;

    }else{
      //CREAR FICHA
       dia =my.getDate();
       mes =my.getMonth()+1;
       ano =my.getFullYear();
       fecha =  dia+'-'+  mes + '-'+ ano;

    }

    registro = new General(
          this.pacienteEditando._id,
          this._idUsuario,
          fecha,
          this.formGeneral.value.medicaGeneral
    );

    if(!this.newformGeneral){
      //Ya existe entonces Actualizar
      this._generalService.actualizarFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaGeneral( this.pacienteEditando._id );
          });
    }else{
      this._generalService.crearFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaGeneral( this.pacienteEditando._id );
          });
    }
  }
  registrarKinesiologia(){
    let registro: Kinesiologia;
    let my = new Date();
    let dia: number;
    let mes: number;
    let ano: number;
    let fecha: string;

    if(!this.newformKinesiologia){
      //Ya existe entonces Actualizar
       fecha = this._kinesiologiaService.fichaKinesiologia.fecha;

    }else{
      //CREAR FICHA
       dia =my.getDate();
       mes =my.getMonth()+1;
       ano =my.getFullYear();
       fecha =  dia+'-'+  mes + '-'+ ano;

    }

    registro = new Kinesiologia(
          this.pacienteEditando._id,
          this._idUsuario,
          fecha,
          this.formKinesiologia.value.estabilidadDesplazamiento,
          this.formKinesiologia.value.coordinacionDinamica,
          this.formKinesiologia.value.conductasPsicomotoras,
          this.formKinesiologia.value.alineacionPostural
    );

    if(!this.newformKinesiologia){
      //Ya existe entonces Actualizar
      this._kinesiologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaKinesiologia( this.pacienteEditando._id );
          });
    }else{
      this._kinesiologiaService.crearFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaKinesiologia( this.pacienteEditando._id );
          });
    }
  }
  registrarPsicologia(){
    let registro: Psicologia;
    let my = new Date();
    let dia: number;
    let mes: number;
    let ano: number;
    let fecha: string;

    if(!this.newformPsicologia){
      //Ya existe entonces Actualizar
       fecha = this._psicologiaService.fichaPsicologia.fecha;

    }else{
      //CREAR FICHA
       dia =my.getDate();
       mes =my.getMonth()+1;
       ano =my.getFullYear();
       fecha =  dia+'-'+  mes + '-'+ ano;

    }

    registro = new Psicologia(
          this.pacienteEditando._id,
          this._idUsuario,
          fecha,
          this.formPsicologia.value.establecerVinculo,
          this.formPsicologia.value.capacidadesAdaptativas,
          this.formPsicologia.value.autoconcepto,
          this.formPsicologia.value.labilidadEmocional
    );

    if(!this.newformPsicologia){
      //Ya existe entonces Actualizar
      this._psicologiaService.actualizarFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaPsicologia( this.pacienteEditando._id );
          });
    }else{
      this._psicologiaService.crearFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaPsicologia( this.pacienteEditando._id );
          });
    }
  }
  registrarTerapeuta(){
    let registro: Terapeuta;
    let my = new Date();
    let dia: number;
    let mes: number;
    let ano: number;
    let fecha: string;

    if(!this.newformTerapeuta){
      //Ya existe entonces Actualizar
       fecha = this._terapeutaService.fichaTerapeuta.fecha;

    }else{
      //CREAR FICHA
       dia =my.getDate();
       mes =my.getMonth()+1;
       ano =my.getFullYear();
       fecha =  dia+'-'+  mes + '-'+ ano;

    }

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

    if(!this.newformTerapeuta){
      //Ya existe entonces Actualizar
      this._terapeutaService.actualizarFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaTerapeuta( this.pacienteEditando._id );
          });
    }else{
      this._terapeutaService.crearFicha(registro)
          .subscribe(resp =>{
            this.buscarFichaTerapeuta( this.pacienteEditando._id );
          });
    }


  }

  crearFichaAnamnesis(){
    this.registrarAnamnesis();
  }

  crearFichaFonoaudiologia(){
      this.newformFonoaudiologia=true;
      this._fonoaudiologiaService.inicializaFicha();
      this.iniFormFonoaudiologia(0, false);
      this.posFechaActualFonoaudiologia=0;
      this.registrarFonoaudiologia();
  }

  crearFichaGeneral(){
      this.newformGeneral=true;
      this._generalService.inicializaFicha();
      this.iniFormGeneral(0);
      this.posFechaActualGeneral=0;
      this.registrarGeneral();
  }

  crearFichaKinesiologia(){
      this.newformKinesiologia=true;
      this._kinesiologiaService.inicializaFicha();
      this.iniFormKinesiologia(0);
      this.posFechaActualKinesiologia=0;
      this.registrarKinesiologia();
  }

  crearFichaPsicologia(){
      this.newformPsicologia=true;
      this._psicologiaService.inicializaFicha();
      this.iniFormPsicologia(0);
      this.posFechaActualPsicologia=0;
      this.registrarPsicologia();
  }

  crearFichaTerapeuta(){
      this.newformTerapeuta=true;
      this._terapeutaService.inicializaFicha();
      this.iniFormTerapeuta(0);
      this.posFechaActualTerapeuta=0;
      this.registrarTerapeuta();
  }
  
  bloqueoAnamnesis(){
    this.formAnamnesis.disable();
  }

  borrar(){
    this.desBloqueoFonoaudiologia();
  }
  borrar1(){
    this.bloqueoFonoaudiologia();
  }
  bloqueoFonoaudiologia(){

    console.log('BLOQUEANDO');
    
    this.formFonoaudiologia.disable();
    this.formFonoaudiologia.get('fechaName').enable();
    
  }

  bloqueoGeneral(){
    this.formGeneral.disable();
    this.formGeneral.get('fechaName').enable();
  }

  bloqueoKinesiologia(){
    this.formKinesiologia.disable();
    this.formKinesiologia.get('fechaName').enable();
  }

  bloqueoPsicologia(){
    this.formPsicologia.disable();
    this.formPsicologia.get('fechaName').enable();
  }

  bloqueoTerapeuta(){
    this.formTerapeuta.disable();
    this.formTerapeuta.get('fechaName').enable();
  }

  desBloqueoAnamnesis(){
    this.formAnamnesis.enable();
  }

  desBloqueoFonoaudiologia(){
    this.formFonoaudiologia.enable();
    this.formFonoaudiologia.get('profesional').disable();

  }

  desBloqueoGeneral(){
    this.formGeneral.enable();
    this.formGeneral.get('profesional').disable();
  }

  desBloqueoKinesiologia(){
    this.formKinesiologia.enable();
    this.formKinesiologia.get('profesional').disable();
  }

  desBloqueoPsicologia(){
    this.formPsicologia.enable();
    this.formPsicologia.get('profesional').disable();
  }

  desBloqueoTerapeuta(){
    this.formTerapeuta.enable();
    this.formTerapeuta.get('profesional').disable();
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
