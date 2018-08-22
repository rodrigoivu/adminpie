import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ValuesPipe } from './values.pipe';
import { PdfPipe } from './pdf.pipe';
import { DocPipe } from './doc.pipe';

@NgModule({
  imports: [],
  declarations: [
  	ImagenPipe,
  	ValuesPipe,
  	PdfPipe,
  	DocPipe
  ],
  exports: [
  	ImagenPipe,
  	ValuesPipe,
  	PdfPipe,
  	DocPipe
  ]
})
export class PipesModule { }
