import { Injectable } from '@angular/core';
import { RouteInfo } from '../../shared/sidebar/sidebar.metadata';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  ROUTES: RouteInfo[] = [];

//     ROUTES: RouteInfo[] = [
//     {
//         path: '',
//         title: 'Principal',           // name of the label
//         icon: '',
//         class: 'nav-small-cap',      // this class is necessary
//         label: '',
//         labelClass: '',
//         extralink: true,
//         submenu: []
//     },
//     {
//         path: '/starter',
//         title: 'Inicio',             // menu title
//         icon: 'mdi mdi-widgets',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//     },
//     {
//         path: '/pages/profesionales',
//         title: 'Profesionales',             // menu title
//         icon: 'mdi mdi-human-male-female',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//     },
//     {
//         path: '/pages/reservas',
//         title: 'Reservas',             // menu title
//         icon: 'mdi mdi-keyboard',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//     },
//     {
//         path: '/pages/pacientes',
//         title: 'Pacientes',             // menu title
//         icon: 'mdi mdi-human-child',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//     },
//     {
//         path: '/pages/usuarios',
//         title: 'Usuarios',             // menu title
//         icon: 'mdi mdi-account-multiple',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//     },
//     {
//         path: '',
//         title: 'Convocatoria',                                                  // menu title
//         icon: 'mdi mdi-google-circles-extended',                                                // menu icon
//         class: 'has-arrow',                                                   // only if driodown menu
//         label: '2',                                                           // label name
//         labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
//         extralink: false,
//         submenu: [                                                        // submenus like single menu config
//             {
//                 path: '/pages/postulacion',
//                 title: 'Postulación',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             },
//             {
//                 path: '/pages/admision',
//                 title: 'Admisión',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             }
//         ]
//     },
//     {
//         path: '',
//         title: 'Datos',           // name of the label
//         icon: '',
//         class: 'nav-small-cap',      // this class is necessary
//         label: '',
//         labelClass: '',
//         extralink: true,
//         submenu: []
//     },
//     {
//         path: '',
//         title: 'Configuración',                                                  // menu title
//         icon: 'mdi mdi-settings',                                                // menu icon
//         class: 'has-arrow',                                                   // only if driodown menu
//         label: '5',                                                           // label name
//         labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
//         extralink: false,
//         submenu: [                                                        // submenus like single menu config
//             {
//                 path: '/pages/crearpacientes',
//                 title: 'Crear pacientes',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             },
//             {
//                 path: '/pages/crearprofesionales',
//                 title: 'Crear Profesionales',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             },
//             {
//                 path: '/pages/crearusuarios',
//                 title: 'Crear usuarios',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             },
//             {
//                 path: '/pages/crearprofesion',
//                 title: 'Crear profesión',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             },
//             {
//                 path: '/pages/crearestablecimiento',
//                 title: 'Crear establecimiento',
//                 icon: '',
//                 class: '',
//                 label: '',
//                 labelClass: '',
//                 extralink: false,
//                 submenu: []
//             }
//         ]
//     }


// ];


  constructor(
  	public _usuarioService: UsuarioService
  	) {  }

    cargarMenu(){
    	this.ROUTES = this._usuarioService.ROUTES;
    }
}
