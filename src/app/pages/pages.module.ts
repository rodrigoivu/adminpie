import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutes } from './pages.routing';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
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
import { BloqueodiasgeneralComponent } from './bloqueodiasgeneral/bloqueodiasgeneral.component';
import { FichasComponent } from './fichas/fichas.component';

import { FileSelectDirective } from 'ng2-file-upload';

//Pipe Module
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    NgbModule,
    PipesModule

  ],
  declarations: [ 

  	ProfesionalesComponent, 
  	ReservasComponent, 
  	PacientesComponent, 
  	UsuariosComponent, 
  	PostulacionComponent, 
  	AdmisionComponent, 
  	CrearpacientesComponent, 
  	CrearprofesionalesComponent, 
  	CrearusuariosComponent, 
  	CrearprofesionComponent, 
  	CrearestablecimientoComponent, 
    ProfileComponent,
    FileSelectDirective,
    BloqueodiasgeneralComponent,
    FichasComponent
    
  ]
})
export class PagesModule { }
