import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ValuesPipe } from './values.pipe';
import { PdfPipe } from './pdf.pipe';
import { DocPipe } from './doc.pipe';
import { XlsPipe } from './xls.pipe';

@NgModule({
  imports: [],
  declarations: [
  	ImagenPipe,
  	ValuesPipe,
  	PdfPipe,
  	DocPipe,
  	XlsPipe
  ],
  exports: [
  	ImagenPipe,
  	ValuesPipe,
  	PdfPipe,
  	DocPipe,
    XlsPipe
  ]
})
export class PipesModule { }
