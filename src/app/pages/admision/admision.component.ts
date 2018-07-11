import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styles: []
})
export class AdmisionComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}

}