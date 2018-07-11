interface Horas{
	nombre: string,
	hora: boolean
}

interface Dias{
	dia: string,
	horas: Horas[]
}

export class Profesional  {
	
	constructor(
		
		public user: string,
		public profesion?: string,
		public dias?: Dias[],
		public _id?: string
	)
	{}
}