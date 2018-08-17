import { Injectable, EventEmitter } from '@angular/core';
import { Anamnesis } from '../../models/anamnesis.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {
	public token: string;
	public fichaAnamnesis: Anamnesis;
  public notificacionNuevaFicha = new EventEmitter<any>();

  constructor(
  	public http: HttpClient
  ) { 
  	this.token = localStorage.getItem('token');
    this.inicializaFicha('','','');
  }

  cargarFicha( id: string ){
    let url = URL_SERVICIOS + 'api/anamnesis-paciente/' + id ;
    return this.http.get( url )
          .pipe(
              map( (resp: any) => {
                //console.log('ANAMNESIS:' + JSON.stringify(resp))
                return resp;

              })
          );
  }
  crearFicha(fichaAnamnesis: Anamnesis){
        
    let url = URL_SERVICIOS + 'api/crear-anamnesis' ;
    
    return  this.http.post( url, fichaAnamnesis )
          .pipe(
              map( (resp: any) => {
                swal('Ficha Anamnesis creada', '', 'success');
                return resp.user;
              }),
              catchError( err => {
                swal( 'Ficha Anamnesis ya existe', '', 'error');
                return throwError( err );
              })
          );
  }

  actualizarFicha( fichaAnamnesis: Anamnesis ){

    let url = URL_SERVICIOS + 'api/update-anamnesis/' + fichaAnamnesis.paciente;
    //url += '?token=' + this.token;

    return this.http.put( url,fichaAnamnesis )
                .map( (resp: any) =>{
                  //let profesionalDB: Profesional = resp.profesional;
                  swal('Anamnesis', 'Actualizado correctamente', 'success' );
                  return true;
                });
  }

  registraFicha( idPaciente: string, idUser: string ){

    let registro: Anamnesis;
    let my = new Date();
    let dia: number =my.getDate();
    let mes: number =my.getMonth()+1;
    let ano: number = my.getFullYear();
    let fecha: string =  dia+'-'+  mes + '-'+ ano;
    
    this.inicializaFicha( idPaciente, idUser,fecha);

    this.crearFicha(this.fichaAnamnesis)
      .subscribe((resp:any) =>{
            this.notificacionNuevaFicha.emit(true);
          });
  }


  inicializaFicha(idPaciente: string, idUser: string, fecha:string){
    this.fichaAnamnesis = new Anamnesis(idPaciente,idUser);
    this.fichaAnamnesis.fecha=fecha;
    this.fichaAnamnesis.antecedentesFamiliares={
      nombreMadre: null,
      edadMadre : null,
      escolaridadMadre : null,
      ocupacionMadre : null,
      horarioTrabajoMadre : null,
      nombrePadre : null,
      edadPadre : null,
      escolaridadPadre : null,
      ocupacionPadre : null,
      horarioTrabajoPadre : null,
      descripcionFamiliar : null
    }
    this.fichaAnamnesis.antecedentesSalud={
      tiempoGestion : '0',
      tipoParto : null,
      motivoCesarea : null,
      pesoNacer : null,
      tallaNacer : null,
      apgar : null,
      enfermedadesPrePostNatal : null,
      cuales : null,
      observaciones : null
    }
    this.fichaAnamnesis.historialClinico={
        enfermedadesFamiliares : null,
        neurologoPsiquiatra : null,
        fonoaudiologo : null,
        educadorPsicopedagogo : null,
        terapeutaOcupacional : null,
        kinesiologo : null,
        psicologo : null,
        biomedicina : null,
        tutora : null,
        otros : null,
        otrosString : null,
        intervencionQuirurgicaHospitalizaciones : null,
        cualesIntervencion : null,
        tratamientosRecibidos : null,
        medicamentos : null,
        cualesMedicamentos : null,
        medicamentosEfectos : null,
        diagnosticos : null
    }
    this.fichaAnamnesis.desarrolloEvolutivo={
      edadSientaSolo : null,
      edadCamino : null,
      desempenoAVD : null,
      estabilidadCaminar : null,
      caidasFrecuentes : null,
      dominanciaLateral : null,
      garra : null,
      pinza : null,
      pinzaComo : null,
      dibuja : null,
      escribe : null,
      corta : null
    }
    this.fichaAnamnesis.destrezasSocialesComunicativas={
      imtaDespedirAplaudir : null,
      diceDiezPalabras : null,
      formulaPreguntas : null,
      hablaFrases : null,
      esperaTurno : null,
      ofreceAyuda : null,
      seComporta : null,
      reccionCorrrecta : null
    }
    this.fichaAnamnesis.comportamientoLudico={
      conQueJuega : null,
      conQuienJuega : null,
      dondeJuega : null,
      actividadesInteres : null,
      personalidad : null
    }
    this.fichaAnamnesis.situacionSocial={
      personasFamilia : null,
      jefeFemenino : null,
      beneficiarioProgramaSocial : null,
      porcentajeRegistroSocial : null,
      ingresoMensual : null,
      ingresoPerCapita : null
    }

  }

  
}
