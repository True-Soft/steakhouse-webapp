import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  photosNumber = 4;

  carouselActive = true;

  showCarousel(showCarousel: boolean){
    console.log('asd')
    this.carouselActive = showCarousel;
  }

  // showCarousel(){
  //   this.carouselActive = true;
  // }

  closeCarousel(){
    this.carouselActive = false;
  }

}
