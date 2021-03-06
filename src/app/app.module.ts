import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { BlankComponent } from './layouts/blank/blank.component';

//Pipe Module
import { PipesModule } from './pipes/pipes.module';

//SERVICIOS
import { ServiceModule } from './services/service.module';

import { ModalUploadComponent } from './component/modal-upload/modal-upload.component';
import { ModalDiaProfesionalComponent } from './component/modal-dia-profesional/modal-dia-profesional.component';
import { ModalSemanaProfesionalComponent } from './component/modal-semana-profesional/modal-semana-profesional.component';
import { ModalEditProfesionalComponent } from './component/modal-edit-profesional/modal-edit-profesional.component';
import { ModalReservaComponent } from './component/modal-reserva/modal-reserva.component';
import { ModalCreaPacienteComponent } from './component/modal-crea-paciente/modal-crea-paciente.component';
import { ModalCreaReservaComponent } from './component/modal-crea-reserva/modal-crea-reserva.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    BlankComponent,
    ModalUploadComponent,
    ModalDiaProfesionalComponent,
    ModalSemanaProfesionalComponent,
    ModalEditProfesionalComponent,
    ModalReservaComponent,
    ModalCreaPacienteComponent,
    ModalCreaReservaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    ServiceModule,
    PipesModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
