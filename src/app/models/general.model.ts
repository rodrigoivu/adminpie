interface  medicaGeneral{
    historial : string,
	tartamiento: string,
	diagnosticos: string,
	medicamentos: string
}

export class General{
	
	constructor(

    public paciente: any,
    public user: any,
    public fecha?: string,
    public medicaGeneral?: medicaGeneral,
    public _id?: string
		
	)
	{}
}