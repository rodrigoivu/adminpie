import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
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
    ChartsModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [
    StarterComponent
  ]
})
export class StarterModule {}
