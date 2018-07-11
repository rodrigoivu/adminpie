import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styles: []
})
export class PostulacionComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}
