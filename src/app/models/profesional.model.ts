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

interface hora {
  nombre: string,
  hora: string,
  valor: boolean
};

interface horaDia {
  dia: string,
  horas: hora[]
}


export class Profesional  {
	
	constructor(
		
		public user: string,
		public profesion?: string,
		public horaSemana?: HoraSemanal[],
    public horasDia?: horaDia[],
		public _id?: string
	)
	{}
}