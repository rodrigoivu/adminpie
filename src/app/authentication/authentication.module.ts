import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './404/not-found.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
    LoginComponent, 
  	SignupComponent, 
  	NotFoundComponent
  ]
})
export class AuthenticationModule { }