import { Routes } from '@angular/router';

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

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'progressbar',
        component: NgbdpregressbarBasicComponentComponent,
        data: {
          title: 'Progressbar',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Progressbar' }
          ]
        }
      },
      {
        path: 'pagination',
        component: NgbdpaginationBasicComponentComponent,
        data: {
          title: 'Pagination',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Pagination' }
          ]
        }
      },
      {
        path: 'accordion',
        component: NgbdAccordionBasicComponentComponent,
        data: {
          title: 'Accordion',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Accordion' }
          ]
        }
      },
      {
        path: 'alert',
        component: NgbdAlertBasicComponentComponent,
        data: {
          title: 'Alert',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Alert' }
          ]
        }
      },
      {
        path: 'carousel',
        component: NgbdCarouselBasicComponentComponent,
        data: {
          title: 'Carousel',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Carousel' }
          ]
        }
      },
      {
        path: 'datepicker',
        component: NgbdDatepickerBasicComponentComponent,
        data: {
          title: 'Datepicker',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Datepicker' }
          ]
        }
      },
      {
        path: 'dropdown',
        component: NgbdDropdownBasicComponentComponent,
        data: {
          title: 'Dropdown',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Dropdown' }
          ]
        }
      },
      {
        path: 'modal',
        component: NgbdModalBasicComponentComponent,
        data: {
          title: 'Modal',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Modal' }
          ]
        }
      },
      {
        path: 'poptool',
        component: NgbdPopTooltipComponentComponent,
        data: {
          title: 'Popover & Tooltip',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Popover & Tooltip' }
          ]
        }
      },
      {
        path: 'rating',
        component: NgbdratingBasicComponentComponent,
        data: {
          title: 'Rating',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Rating' }
          ]
        }
      },
      {
        path: 'tabs',
        component: NgbdtabsBasicComponentComponent,
        data: {
          title: 'Tabs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Tabs' }
          ]
        }
      },
      {
        path: 'timepicker',
        component: NgbdtimepickerBasicComponentComponent,
        data: {
          title: 'Timepicker',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Timepicker' }
          ]
        }
      },
      {
        path: 'typehead',
        component: NgbdtypeheadBasicComponentComponent,
        data: {
          title: 'Typehead',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Typehead' }
          ]
        }
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Button',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Button' }
          ]
        }
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Card',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Card' }
          ]
        }
      }
    ]
  }
];
