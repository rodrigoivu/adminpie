import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(function() {
      $('.preloader').fadeOut();
    });
  }
}