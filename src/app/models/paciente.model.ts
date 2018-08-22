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
		public autorizacionSalida?:string,
		public autorizacionTransporte?:string,
		public protocoloAdir?:string,
		public protocoloAdos?:string,
		public protocoloEvaluacion1?:string,
		public protocoloEvaluacion2?:string,
		public protocoloEvaluacion3?:string,
		public protocoloEvaluacion4?:string,
		public protocoloEvaluacion5?: string,	
		public protocoloInformeFinal?:string,
		public protocolo1SubidoPor?: string,
		public protocolo2SubidoPor?: string,
		public protocolo3SubidoPor?: string,
		public protocolo4SubidoPor?: string,
		public protocolo5SubidoPor?: string,
		public protocolo6SubidoPor?: string,
		public protocolo7SubidoPor?: string,
		public protocolo8SubidoPor?: string,
		public protocolo9SubidoPor?: string,
		public protocolo10SubidoPor?: string,
		public _id?: string

		)
	{}
}