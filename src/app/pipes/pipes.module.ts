import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ValuesPipe } from './values.pipe';

@NgModule({
  imports: [],
  declarations: [
  	ImagenPipe,
  	ValuesPipe
  ],
  exports: [
  	ImagenPipe,
  	ValuesPipe
  ]
})
export class PipesModule { }
