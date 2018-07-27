import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../component/modal-upload/modal-upload.service';

import { UsuarioService,
         ProfesionalService,
         PacienteService,
         LoginGuardGuard, 
         AdminGuard, 
         AdminMedicalUserGuard,
         AdminMedicalGuard,
         AdminUserGuard,
         AdminPesquisaGuard,
         VerificaTokenGuard,
         SubirArchivoService, 
         SidebarService,
         BloqueoService
       } from './service.index';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
  	UsuarioService,
    ProfesionalService,
    PacienteService,
  	LoginGuardGuard,
    AdminGuard,
    AdminMedicalUserGuard,
    AdminMedicalGuard,
    AdminUserGuard,
    AdminPesquisaGuard,
    VerificaTokenGuard,
  	SubirArchivoService,
    SidebarService,
    BloqueoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
