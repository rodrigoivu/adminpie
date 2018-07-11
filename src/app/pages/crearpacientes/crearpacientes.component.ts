import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-crearpacientes',
  templateUrl: './crearpacientes.component.html',
  styles: []
})
export class CrearpacientesComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}
