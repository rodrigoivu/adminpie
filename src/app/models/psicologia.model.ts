interface  establecerVinculo{
  actividad1: number,
  actividad2: number,
  actividad3: number
  
}
interface  capacidadesAdaptativas{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number
  
}
interface  autoconcepto{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number,
  actividad5: number,
  actividad6: number,
  actividad7: number,
  actividad8: number
  
}
interface  labilidadEmocional{
  actividad1: number,
  actividad2: number,
  actividad3: number,
  actividad4: number
  
}

export class Psicologia{
	
	constructor(

    public paciente: any,
    public user: any,
    public fecha?: string,
  	public establecerVinculo?: establecerVinculo,
	  public capacidadesAdaptativas?: capacidadesAdaptativas,
	  public autoconcepto?: autoconcepto,
	  public labilidadEmocional?: labilidadEmocional,
    public _id?: string
		
	)
	{}
}