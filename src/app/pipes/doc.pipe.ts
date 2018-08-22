import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(protocolo: string): any {
  	let url = URL_SERVICIOS + 'api/get-doc-paciente/';

  	switch ( protocolo ){

  		case 'archivo1':
  			url += 'Modulo_1_No_palabras.doc';
  		break;

  		case 'archivo2':
  			url += 'Modulo_1_Palabras.doc';	
  		break;

  		case 'archivo3':
  			url += 'Modulo_2_Mayores_de_5_anos.doc';
  		break;

  		case 'archivo4':
  			url += 'Modulo_2_Menores_de_5_anos.doc';
  		break;

  		case 'archivo5':
  			url += 'Modulo_3.doc';
  		break;

  		case 'archivo6':
  			url += 'Modulo_4.doc';
  		break;

  		case 'archivo7':
  			url += 'Modulo_T_No_palabras.doc';
  		break;

  		case 'archivo8':
  			url += 'Modulo_T_Palabras.doc';
  		break;


  	}
  	return url;
  }

}
