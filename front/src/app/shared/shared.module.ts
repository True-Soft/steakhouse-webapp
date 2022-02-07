import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';

import { CarouselComponent } from './components/carousel/carousel.component'

@NgModule({
  declarations: [
    CarouselComponent,
    
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    CarouselComponent,
    
  ]
})

export class SharedModule { }
