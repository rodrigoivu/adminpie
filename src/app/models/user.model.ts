export class User  {
	
	constructor(
		
		public name: string,
		public email: string,
		public password: string,
		public surname?: string,
		public image?: string,
		public role?: string,
		public _id?: string,
	)
	{}
}