interface NgbDate {
  day: number,
  month: number,
  year: number
}

export class Paciente  {
	
	constructor(

		public rut:string,
		public name: string,
		public fechaNacimiento?: NgbDate,
		public establecimiento?:string,
		public nivel?:string,
		public direccion?:string,
		public fijo?:string,
		public celular?:string,
		public email?:string,
		public _id?: string
	)
	{}
}