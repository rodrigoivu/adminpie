//ESTE ARCHIVO NO SE USA SE CAMBIO POR CODIGO EN EL BACKEND

import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Principal',           // name of the label
        icon: '',
        class: 'nav-small-cap',      // this class is necessary
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '/starter',
        title: 'Inicio',             // menu title
        icon: 'mdi mdi-widgets',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
    },
    {
        path: '/pages/profesionales',
        title: 'Profesionales',             // menu title
        icon: 'mdi mdi-human-male-female',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
    },
    {
        path: '/pages/reservas',
        title: 'Reservas',             // menu title
        icon: 'mdi mdi-keyboard',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
    },
    {
        path: '/pages/pacientes',
        title: 'Pacientes',             // menu title
        icon: 'mdi mdi-human-child',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
    },
    {
        path: '/pages/usuarios',
        title: 'Usuarios',             // menu title
        icon: 'mdi mdi-account-multiple',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
    },
    {
        path: '',
        title: 'Convocatoria',                                                  // menu title
        icon: 'mdi mdi-google-circles-extended',                                                // menu icon
        class: 'has-arrow',                                                   // only if driodown menu
        label: '2',                                                           // label name
        labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
        extralink: false,
        submenu: [                                                        // submenus like single menu config
            {
                path: '/pages/postulacion',
                title: 'Postulación',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/pages/admision',
                title: 'Admisión',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Datos',           // name of the label
        icon: '',
        class: 'nav-small-cap',      // this class is necessary
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '',
        title: 'Configuración',                                                  // menu title
        icon: 'mdi mdi-settings',                                                // menu icon
        class: 'has-arrow',                                                   // only if driodown menu
        label: '5',                                                           // label name
        labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
        extralink: false,
        submenu: [                                                        // submenus like single menu config
            {
                path: '/pages/crearpacientes',
                title: 'Crear pacientes',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/pages/crearprofesionales',
                title: 'Crear Profesionales',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/pages/crearusuarios',
                title: 'Crear usuarios',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/pages/crearprofesion',
                title: 'Crear profesión',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/pages/crearestablecimiento',
                title: 'Crear establecimiento',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            }
        ]
    }

 // {
  //   path: '',
  //   title: 'Personal',
  //   icon: '',
  //   class: 'nav-small-cap',
  //   label: '',
  //   labelClass: '',
  //   extralink: true,
  //   submenu: []
  // },
  // {
  //   path: '/starter',
  //   title: 'Starter Page',
  //   icon: 'mdi mdi-gauge',
  //   class: '',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'UI Components',
  //   icon: '',
  //   class: 'nav-small-cap',
  //   label: '',
  //   labelClass: '',
  //   extralink: true,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'Component',
  //   icon: 'mdi mdi-bullseye',
  //   class: 'has-arrow',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/component/accordion',
  //       title: 'Accordion',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/alert',
  //       title: 'Alert',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/carousel',
  //       title: 'Carousel',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/dropdown',
  //       title: 'Dropdown',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/modal',
  //       title: 'Modal',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/pagination',
  //       title: 'Pagination',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/poptool',
  //       title: 'Popover & Tooltip',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/progressbar',
  //       title: 'Progressbar',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/rating',
  //       title: 'Ratings',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/tabs',
  //       title: 'Tabs',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/timepicker',
  //       title: 'Timepicker',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/buttons',
  //       title: 'Button',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/cards',
  //       title: 'Card',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Menu Levels',
  //   icon: 'mdi mdi-arrange-send-backward',
  //   class: 'has-arrow',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: 'javascript:void(0);',
  //       title: 'Second Level',
  //       icon: '',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: true,
  //       submenu: []
  //     },
  //     {
  //       path: '',
  //       title: 'Second Child',
  //       icon: '',
  //       class: 'has-arrow',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: [
  //         {
  //           path: 'javascript:void(0);',
  //           title: 'Third 1.1',
  //           icon: '',
  //           class: '',
  //           label: '',
  //           labelClass: '',
  //           extralink: false,
  //           submenu: []
  //         },
  //         {
  //           path: 'javascript:void(0);',
  //           title: 'Third 1.2',
  //           icon: '',
  //           class: '',
  //           label: '',
  //           labelClass: '',
  //           extralink: false,
  //           submenu: []
  //         }
  //       ]
  //     }
  //   ]
  //}
];
