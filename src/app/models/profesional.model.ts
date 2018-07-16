interface HoraSemanal{
  horaLu: boolean,
  horaMa: boolean,
  horaMi: boolean,
  horaJu: boolean,
  horaVi: boolean,
  horaSa: boolean,
  horaDo: boolean,
  nombreLu: string,
  nombreMa: string,
  nombreMi: string,
  nombreJu: string,
  nombreVi: string,
  nombreSa: string,
  nombreDo: string,
  hora: string
}


export class Profesional  {
	
	constructor(
		
		public user: string,
		public profesion?: string,
		public horaSemana?: HoraSemanal[],
		public _id?: string
	)
	{}
}