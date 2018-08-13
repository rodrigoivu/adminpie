interface  actividadesVidaDiaria{
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
  actividad18: number
  
}
interface  actividadesInstrumentales{
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
  actividad14: number
  
}
interface  descansoSueno{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number
  
}
interface  educacion{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number
  
}
interface  ocio{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number
  
}
interface  juego{
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
  actividad36: number
  
}
interface  participacionSocial{
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
  actividad22: number
  
}
interface  transversal{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number
  
}

export class Terapeuta{
	
	constructor(

    public paciente: any,
    public user: any,
    public fecha?: string,
  	public actividadesVidaDiaria?: actividadesVidaDiaria,
	  public actividadesInstrumentales?: actividadesInstrumentales,
	  public descansoSueno?: descansoSueno,
	  public educacion?: educacion,
	  public ocio?: ocio,
	  public juego?: juego,
	  public participacionSocial?: participacionSocial,
	  public transversal?: transversal,
    public _id?: string
		
	)
	{}
}