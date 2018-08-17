
// interface NgbDate {
//   day: number,
//   month: number,
//   year: number
// }

interface antecedentesFamiliares {
  nombreMadre : string,
  edadMadre : number,
  escolaridadMadre : string,
  ocupacionMadre : string,
  horarioTrabajoMadre : string,
  nombrePadre : string,
  edadPadre : number,
  escolaridadPadre : string,
  ocupacionPadre : string,
  horarioTrabajoPadre : string,
  descripcionFamiliar : string
}
interface antecedentesSalud {
  tiempoGestion : string,
  tipoParto : string,
  motivoCesarea : string,
  pesoNacer : string,
  tallaNacer : string,
  apgar : string,
  enfermedadesPrePostNatal : string,
  cuales : string,
  observaciones : string
}

interface historialClinico {
  enfermedadesFamiliares : string,
  neurologoPsiquiatra : number,
  fonoaudiologo : number,
  educadorPsicopedagogo : number,
  terapeutaOcupacional : number,
  kinesiologo : number,
  psicologo : number,
  biomedicina : number,
  tutora : number,
  otros : number,
  otrosString : string,
  intervencionQuirurgicaHospitalizaciones : string,
  cualesIntervencion : string,
  tratamientosRecibidos : string,
  medicamentos : string,
  cualesMedicamentos : string,
  medicamentosEfectos : string,
  diagnosticos : string
}

interface desarrolloEvolutivo {
  edadSientaSolo : string,
  edadCamino : string,
  desempenoAVD : string,
  estabilidadCaminar : number,
  caidasFrecuentes : number,
  dominanciaLateral : number,
  garra : number,
  pinza : number,
  pinzaComo : number,
  dibuja : number,
  escribe : number,
  corta : number
}

interface destrezasSocialesComunicativas {
  imtaDespedirAplaudir : number,
  diceDiezPalabras : number,
  formulaPreguntas : number,
  hablaFrases : number,
  esperaTurno : number,
  ofreceAyuda : number,
  seComporta : number,
  reccionCorrrecta : number
  
}
interface comportamientoLudico {
  conQueJuega : string,
  conQuienJuega : string,
  dondeJuega : string,
  actividadesInteres : string,
  personalidad : string
  
}
interface situacionSocial {
  personasFamilia : number,
  jefeFemenino : string,
  beneficiarioProgramaSocial : string,
  porcentajeRegistroSocial : number,
  ingresoMensual : number,
  ingresoPerCapita : number
  
}


export class Anamnesis  {
	
	constructor(

    public paciente: any,
    public user: any,
    public fecha?: string,
    public antecedentesFamiliares?: antecedentesFamiliares,
    public antecedentesSalud?: antecedentesSalud,
    public historialClinico?: historialClinico,
    public desarrolloEvolutivo?: desarrolloEvolutivo,
    public destrezasSocialesComunicativas?: destrezasSocialesComunicativas,
    public comportamientoLudico?: comportamientoLudico,
    public situacionSocial?: situacionSocial,
    public _id?: string
		
	)
	{}
}