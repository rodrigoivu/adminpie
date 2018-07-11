import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-crearprofesion',
  templateUrl: './crearprofesion.component.html',
  styles: []
})
export class CrearprofesionComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}
