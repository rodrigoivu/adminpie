export class Paciente  {
	
	constructor(
		
		public name: string,
		public email?:string,
		public rut?:string,
		public direccion?:string,
		public fijo?:string,
		public celular?:string,
		public padre?:string,
		public madre?:string,
		public nacimiento?:string,
		public comuna?:string,
		public observaciones?:string,
		public _id?: string
	)
	{}
}