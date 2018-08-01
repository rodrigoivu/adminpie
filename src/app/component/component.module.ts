import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdpregressbarBasicComponentComponent } from './progressbar/progressbar.component';
import { NgbdpaginationBasicComponentComponent } from './pagination/pagination.component';
import { NgbdAccordionBasicComponentComponent } from './accordion/accordion.component';
import { NgbdAlertBasicComponentComponent } from './alert/alert.component';
import { NgbdCarouselBasicComponentComponent } from './carousel/carousel.component';
import { NgbdDatepickerBasicComponentComponent } from './datepicker/datepicker.component';
import { NgbdDropdownBasicComponentComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponentComponent } from './modal/modal.component';
import { NgbdPopTooltipComponentComponent } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponentComponent } from './rating/rating.component';
import { NgbdtabsBasicComponentComponent } from './tabs/tabs.component';
import { NgbdtimepickerBasicComponentComponent } from './timepicker/timepicker.component';
import { NgbdtypeheadBasicComponentComponent } from './typehead/typehead.component';
import { CardsComponent } from './card/card.component';
import { ButtonsComponent } from './buttons/buttons.component';
//import { ComponentComponent } from './component.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule
  ],
  declarations: [
    NgbdpregressbarBasicComponentComponent,
    NgbdpaginationBasicComponentComponent,
    NgbdAccordionBasicComponentComponent,
    NgbdAlertBasicComponentComponent,
    NgbdCarouselBasicComponentComponent,
    NgbdDatepickerBasicComponentComponent,
    NgbdDropdownBasicComponentComponent,
    NgbdModalBasicComponentComponent,
    NgbdPopTooltipComponentComponent,
    NgbdratingBasicComponentComponent,
    NgbdtabsBasicComponentComponent,
    NgbdtimepickerBasicComponentComponent,
    NgbdtypeheadBasicComponentComponent,
    CardsComponent,
    ButtonsComponent
    
  ]
})
export class ComponentsModule {}
