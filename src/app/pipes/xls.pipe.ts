import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'xls'
})
export class XlsPipe implements PipeTransform {

  transform(xls: string): any {
  	let url = URL_SERVICIOS + 'api/get-xls-pesquisa/';

  	if ( xls ){
  		return url += xls;
  	}
  }

}
