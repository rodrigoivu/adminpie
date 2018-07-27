import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Bloqueo  {
	
	constructor(
		
		public dateDesde: NgbDateStruct,
		public dateHasta: NgbDateStruct,
		public descripcion: string,
		public _id?: string
	)
	{}
}