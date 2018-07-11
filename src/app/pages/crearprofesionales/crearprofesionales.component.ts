import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-crearprofesionales',
  templateUrl: './crearprofesionales.component.html',
  styles: []
})
export class CrearprofesionalesComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}
