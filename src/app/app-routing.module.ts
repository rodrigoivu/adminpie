import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginGuardGuard } from './services/service.index'

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
      { path: 'starter',loadChildren: './starter/starter.module#StarterModule' },
      { path: 'pages',
        
        loadChildren: './pages/pages.module#PagesModule' 
      },
      { path: 'component',loadChildren: './component/component.module#ComponentsModule' }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
