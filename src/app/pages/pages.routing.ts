import { Routes } from '@angular/router';

import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { BloqueodiasgeneralComponent } from './bloqueodiasgeneral/bloqueodiasgeneral.component';
import { FichasComponent } from './fichas/fichas.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { AdmisionComponent } from './admision/admision.component';
import { CrearpacientesComponent } from './crearpacientes/crearpacientes.component';
import { CrearprofesionalesComponent } from './crearprofesionales/crearprofesionales.component';
import { CrearusuariosComponent } from './crearusuarios/crearusuarios.component';
import { CrearprofesionComponent } from './crearprofesion/crearprofesion.component';
import { CrearestablecimientoComponent } from './crearestablecimiento/crearestablecimiento.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Perfil usuario',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Perfl usuario' }
          ]
        }
      },
      {
        path: 'profesionales',
        component: ProfesionalesComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Profesionales',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Profesionales' }
          ]
        }
      },
      {
        path: 'bloqueogeneral',
        component: BloqueodiasgeneralComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Bloqueo General',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Bloqueo General' }
          ]
        }
      },
      {
        path: 'reservas',
        component: ReservasComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Reservas',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Reservas' }
          ]
        }
      },
      {
        path: 'pacientes',
        component: PacientesComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Pacientes',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Pacientes' }
          ]
        }
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data: {
          title: 'Usuarios',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Usuarios' }
          ]
        }
      },
      {
        path: 'postulacion',
        component: PostulacionComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Postulación',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Postulación' }
          ]
        }
      },
      {
        path: 'admision',
        component: AdmisionComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Admisión',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Admisión' }
          ]
        }
      },
      {
        path: 'crearpacientes',
        component: CrearpacientesComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Crear pacientes',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Crear pacientes' }
          ]
        }
      }
      ,
      {
        path: 'crearprofesionales',
        component: CrearprofesionalesComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Crear profesionales',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Crear profesioanles' }
          ]
        }
      },
      {
        path: 'crearusuarios',
        component: CrearusuariosComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Mantenimiento de Usuarios',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Mantenimiento de Usuarios' }
          ]
        }
      },
      {
        path: 'crearprofesion',
        component: CrearprofesionComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Crear profesión',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Crear profesión' }
          ]
        }
      },
      {
        path: 'crearestablecimiento',
        component: CrearestablecimientoComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Crear establecimiento',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Crear establecimiento' }
          ]
        }
      },
      {
        path: 'fichaspaciente',
        component: FichasComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
          title: 'Fichas Paciente',
          urls: [
            { title: 'Inicio', url: '/starter' },
            { title: 'Pacientes', url: '/pages/pacientes' },
            { title: 'Fichas Paciente' }
          ]
        }
      }
      
    ]
  }
];