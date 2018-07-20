
interface PosHora {
  pos: number
};

export class Reserva  {
	
	constructor(
		
		public paciente: string, 
		public user: string, //este es el usuario relacionado con el profesional
		public fecha: string,
		public horaReservado: number,
		public poshora: PosHora[  ],
		public fecharegistro?: string,
		public estado?: string,
		public confirmada?: string
	)
	{}
}