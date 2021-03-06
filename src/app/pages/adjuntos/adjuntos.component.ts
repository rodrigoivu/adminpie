import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { ProfesionalService, PacienteService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adjuntos',
  templateUrl: './adjuntos.component.html',
  styles: []
})
export class AdjuntosComponent implements OnInit {
  	pacienteEditando: Paciente;
  	//Flag Indicadores
    pacienteConDatos: boolean=false;

    //PROTOCOLOS
    autorizacionSalida: string=null;
  	autorizacionTransporte:string=null;
  	protocoloAdir:string=null;
  	protocoloAdos:string=null;
  	protocoloEvaluacion1:string=null;
  	protocoloEvaluacion2:string=null;
  	protocoloEvaluacion3:string=null;
  	protocoloEvaluacion4:string=null;
  	protocoloEvaluacion5:string=null;	
  	protocoloInformeFinal:string=null;

  	//PROTOCOLOS SUBIDO POR
  	protocolo1SubidoPor:string=null;
  	protocolo2SubidoPor:string=null;
  	protocolo3SubidoPor:string=null;
  	protocolo4SubidoPor:string=null;
  	protocolo5SubidoPor:string=null;
  	protocolo6SubidoPor:string=null;
  	protocolo7SubidoPor:string=null;
  	protocolo8SubidoPor:string=null;
  	protocolo9SubidoPor:string=null;
  	protocolo10SubidoPor:string=null;

    //Datos de usuario Actual
  	usuario:any;
  	role:string;
  	_idUsuario: string;
  	nombreUsuario: string;
  	profesion: string;
    
    archivoSubir1: File;
    archivoSubir2: File;
    archivoSubir3: File;
    archivoSubir4: File;
    archivoSubir5: File;
    archivoSubir6: File;
    archivoSubir7: File;
    archivoSubir8: File;


    //DOWNLOAD
    archivo1:string='archivo1';
    archivo2:string='archivo2';
    archivo3:string='archivo3';
    archivo4:string='archivo4';
    archivo5:string='archivo5';
    archivo6:string='archivo6';
    archivo7:string='archivo7';
    archivo8:string='archivo8';


  constructor(
       public _profesionalService: ProfesionalService,
  	   public _pacienteService: PacienteService,
       private router: Router, 
       private route: ActivatedRoute
  	) { 

   	this.usuario=JSON.parse(localStorage.getItem('usuario'));
    this._idUsuario = this.usuario._id;
    this.nombreUsuario = this.usuario.name;
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
 
          });
    
    this._pacienteService.notificacionActualizado
          .subscribe( resp => {
            this.cargaPaciente();
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
    	this.autorizacionSalida = this.pacienteEditando.autorizacionSalida;
  		this.autorizacionTransporte= this.pacienteEditando.autorizacionTransporte;
  		this.protocoloAdir= this.pacienteEditando.protocoloAdir;
  		this.protocoloAdos= this.pacienteEditando.protocoloAdos;
  		this.protocoloEvaluacion1= this.pacienteEditando.protocoloEvaluacion1;
  		this.protocoloEvaluacion2= this.pacienteEditando.protocoloEvaluacion2;
  		this.protocoloEvaluacion3= this.pacienteEditando.protocoloEvaluacion3;
  		this.protocoloEvaluacion4= this.pacienteEditando.protocoloEvaluacion4;
  		this.protocoloEvaluacion5= this.pacienteEditando.protocoloEvaluacion5;	
  		this.protocoloInformeFinal= this.pacienteEditando.protocoloInformeFinal;
  		this.protocolo1SubidoPor = this.pacienteEditando.protocolo1SubidoPor;
  		this.protocolo2SubidoPor = this.pacienteEditando.protocolo2SubidoPor;
  		this.protocolo3SubidoPor = this.pacienteEditando.protocolo3SubidoPor;
  		this.protocolo4SubidoPor = this.pacienteEditando.protocolo4SubidoPor;
  		this.protocolo5SubidoPor = this.pacienteEditando.protocolo5SubidoPor;
  		this.protocolo6SubidoPor = this.pacienteEditando.protocolo6SubidoPor;
  		this.protocolo7SubidoPor = this.pacienteEditando.protocolo7SubidoPor;
  		this.protocolo8SubidoPor = this.pacienteEditando.protocolo8SubidoPor;
  		this.protocolo9SubidoPor = this.pacienteEditando.protocolo9SubidoPor;
  		this.protocolo10SubidoPor = this.pacienteEditando.protocolo10SubidoPor;

    }
  }

  cargaPaciente(){
  	this._pacienteService.buscarPaciente(this._pacienteService.pacienteSeleccionado._id)
  		.subscribe( (resp: any) => {

          if( resp.paciente ){
           	this.pacienteEditando = resp.paciente;
          	this.autorizacionSalida = this.pacienteEditando.autorizacionSalida;
      			this.autorizacionTransporte= this.pacienteEditando.autorizacionTransporte;
      			this.protocoloAdir= this.pacienteEditando.protocoloAdir;
      			this.protocoloAdos= this.pacienteEditando.protocoloAdos;
      			this.protocoloEvaluacion1= this.pacienteEditando.protocoloEvaluacion1;
      			this.protocoloEvaluacion2= this.pacienteEditando.protocoloEvaluacion2;
      			this.protocoloEvaluacion3= this.pacienteEditando.protocoloEvaluacion3;
      			this.protocoloEvaluacion4= this.pacienteEditando.protocoloEvaluacion4;
      			this.protocoloEvaluacion5= this.pacienteEditando.protocoloEvaluacion5;	
      			this.protocoloInformeFinal= this.pacienteEditando.protocoloInformeFinal;
      			this.protocolo1SubidoPor = this.pacienteEditando.protocolo1SubidoPor;
  		  		this.protocolo2SubidoPor = this.pacienteEditando.protocolo2SubidoPor;
  		  		this.protocolo3SubidoPor = this.pacienteEditando.protocolo3SubidoPor;
  		  		this.protocolo4SubidoPor = this.pacienteEditando.protocolo4SubidoPor;
  		  		this.protocolo5SubidoPor = this.pacienteEditando.protocolo5SubidoPor;
  		  		this.protocolo6SubidoPor = this.pacienteEditando.protocolo6SubidoPor;
  		  		this.protocolo7SubidoPor = this.pacienteEditando.protocolo7SubidoPor;
  		  		this.protocolo8SubidoPor = this.pacienteEditando.protocolo8SubidoPor;
  		  		this.protocolo9SubidoPor = this.pacienteEditando.protocolo9SubidoPor;
  		  		this.protocolo10SubidoPor = this.pacienteEditando.protocolo10SubidoPor;
          }
        });
  }

  seleccionArchivo( archivo: File, valor:number ){

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
         case 3: { 
            this.archivoSubir3 = null;
            break; 
         } 
         case 4: { 
            this.archivoSubir4 = null;
            break; 
         } 
         case 5: { 
            this.archivoSubir5 = null;
            break; 
         } 
         case 6: { 
            this.archivoSubir6 = null;
            break; 
         } 
         case 7: { 
            this.archivoSubir7 = null;
            break; 
         } 
         case 8: { 
            this.archivoSubir8 = null;
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
         case 3: { 
            this.archivoSubir3 = null;
            break; 
         } 
         case 4: { 
            this.archivoSubir4 = null;
            break; 
         } 
         case 5: { 
            this.archivoSubir5 = null;
            break; 
         } 
         case 6: { 
            this.archivoSubir6 = null;
            break; 
         } 
         case 7: { 
            this.archivoSubir7 = null;
            break; 
         } 
         case 8: { 
            this.archivoSubir8 = null;
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
         case 3: { 
            this.archivoSubir3 = archivo;
            break; 
         } 
         case 4: { 
            this.archivoSubir4= archivo;
            break; 
         } 
         case 5: { 
            this.archivoSubir5 = archivo;
            break; 
         } 
         case 6: { 
            this.archivoSubir6 = archivo;
            break; 
         } 
         case 7: { 
            this.archivoSubir7 = archivo;
            break; 
         } 
         case 8: { 
            this.archivoSubir8 = archivo;
            break; 
         } 
      } 
  	 

  }

  guardarArchivo(itemArchivo:string, valor:number){
  	let profesionalProfesion:string = this.nombreUsuario+'-'+this.profesion;
    
    switch(valor) { 
         case 1: { 
            this._pacienteService.guardarArchivo( this.archivoSubir1, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
         case 2: { 
            this._pacienteService.guardarArchivo( this.archivoSubir2, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         }
         case 3: { 
            this._pacienteService.guardarArchivo( this.archivoSubir3, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
         case 4: { 
            this._pacienteService.guardarArchivo( this.archivoSubir4, this.pacienteEditando._id,itemArchivo,profesionalProfesion);   
            break; 
         } 
         case 5: { 
            this._pacienteService.guardarArchivo( this.archivoSubir5, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
         case 6: { 
            this._pacienteService.guardarArchivo( this.archivoSubir6, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
         case 7: { 
            this._pacienteService.guardarArchivo( this.archivoSubir7, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
         case 8: { 
            this._pacienteService.guardarArchivo( this.archivoSubir8, this.pacienteEditando._id,itemArchivo,profesionalProfesion);
            break; 
         } 
      } 
  	
  }


}
