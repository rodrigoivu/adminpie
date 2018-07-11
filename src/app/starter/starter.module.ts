import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { VerificaTokenGuard } from '../services/service.index'

const routes: Routes = [
  {
    path: '',
    canActivate:[ VerificaTokenGuard ],
    data: {
      title: 'Inicio',
      urls: [
        { title: 'Inicio' },
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [
    StarterComponent
  ]
})
export class StarterModule {}
