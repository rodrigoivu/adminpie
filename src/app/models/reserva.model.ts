
interface PosHora {
  pos: number
};

export class Reserva  {
	
	constructor(
		
		public paciente: any, 
		public user: string, //este es el usuario relacionado con el profesional
		public fecha: string,
		public horaReservado: number,
		public poshora: PosHora[],
		public fecharegistro?: string,
		public estado?: string,
		public confirmada?: string,
		public repiteDia?: number,   //valores del 0 al 6 de domingo a sábado, si es 10 es porque no se repite
		public repiteAno?: number 
	)
	{}
}