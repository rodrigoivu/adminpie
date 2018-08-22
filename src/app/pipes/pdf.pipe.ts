import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {

  transform(pdf: string): any {
  	let url = URL_SERVICIOS + 'api/get-pdf-paciente/';

  	if ( !pdf ){
  		return url + 'xxx';
  	}else{
  		url += pdf;
  	}
    return url;
  }

}
