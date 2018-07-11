import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-crearestablecimiento',
  templateUrl: './crearestablecimiento.component.html',
  styles: []
})
export class CrearestablecimientoComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}
