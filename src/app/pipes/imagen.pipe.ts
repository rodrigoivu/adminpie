import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
  	let url = URL_SERVICIOS + 'api/get-image-user/';

  	if ( !img ){
  		return url + 'xxx';
  	}

  	//Esto retorna la imagen si el usuario usó google para loguearse
  	if ( img.indexOf('https') >=0 ){
  		return img;
  	}

  	switch ( tipo ){

  		case 'usuario':
  			 url += img;
  		break;

  		case 'medico':

  		break;

  		case 'hospital':

  		break;

  		case 'establecimiento':

  		break;

  		default:
  			console.log ('tipo de imagen no existe');
  			url += '/xxx';

  	}

    return url;
  }

}
