interface prelinguisticas{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number,
  actividad26: number,
  actividad27: number,
  actividad28: number,
  actividad29: number,
  actividad30: number
  
}
interface prearticulatorias{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number,
  actividad26: number
  
}
interface psicolinguisticas{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number
  
}
interface foneticoFonologico{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number,
  actividad26: number,
  actividad27: number,
  actividad28: number,
  actividad29: number,
  actividad30: number,
  actividad31: number,
  actividad32: number,
  actividad33: number,
  actividad34: number,
  actividad35: number,
  actividad36: number,
  actividad37: number,
  actividad38: number,
  actividad39: number,
  actividad40: number,
  actividad41: number,
  actividad42: number,
  actividad43: number,
  actividad44: number,
  actividad45: number,
  actividad46: number,
  actividad47: number,
  actividad48: number,
  actividad49: number,
  actividad50: number,
  actividad51: number,
  actividad52: number,
  actividad53: number,
  actividad54: number,
  actividad55: number,
  actividad56: number,
  actividad57: number,
  actividad58: number,
  actividad59: number,
  actividad60: number,
  actividad61: number,
  actividad62: number,
  actividad63: number,
  actividad64: number,
  actividad65: number,
  actividad66: number,
  actividad67: number,
  actividad68: number,
  actividad69: number,
  actividad70: number,
  actividad71: number,
  actividad72: number,
  actividad73: number,
  actividad74: number
  
}
interface semantico{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number,
  actividad26: number,
  actividad27: number,
  actividad28: number
  
}
interface morfosintactico{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number
  
}
interface pragmatico{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number,
  actividad9: number,
  actividad10: number,
  actividad11: number,
  actividad12: number,
  actividad13: number,
  actividad14: number,
  actividad15: number,
  actividad16: number,
  actividad17: number,
  actividad18: number,
  actividad19: number,
  actividad20: number,
  actividad21: number,
  actividad22: number,
  actividad23: number,
  actividad24: number,
  actividad25: number,
  actividad26: number,
  actividad27: number,
  actividad28: number
  
}
interface discursoNarrativo{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number
  
}
interface socialComunicativa{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number
  
}


export class Fonoaudiologia{
	
	constructor(

    public paciente: any,
    public user: any,
    public fecha?: string,
    public prelinguisticas?: prelinguisticas,
	  public prearticulatorias?: prearticulatorias,
	  public psicolinguisticas?: psicolinguisticas,
	  public foneticoFonologico?: foneticoFonologico,
	  public semantico?: semantico,
	  public morfosintactico?: morfosintactico,
	  public pragmatico?: pragmatico,
	  public discursoNarrativo?: discursoNarrativo,
	  public socialComunicativa?: socialComunicativa,
    public _id?: string
		
	)
	{}
}