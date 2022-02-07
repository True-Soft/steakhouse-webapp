import { Component } from '@angular/core';

interface Dish {
  image: string,
  name: string,
  description: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  img = '../../../assets/images/dish0.jpg' 

  images: string[] = [
    '../../../assets/images/dish1.jpg', 
    '../../../assets/images/dish2.jpg', 
    '../../../assets/images/dish3.jpg'
  ]
  descriptions: string[] = [
    'description one',
    'description two',
    'description three'
  ]  
  names: string[] = [
    'name one',
    'name two',
    'name three'
  ] 
  showNavigationArrows = true;
  dishes: Dish[] = [
    { image: this.images[0], name: this.names[0], description: this.descriptions[0] },
    { image: this.images[1], name: this.names[1], description: this.descriptions[1] },
    { image: this.images[2], name: this.names[2], description: this.descriptions[2] },
  ];

  //dishes = {this.images, this.descriptions}.map((n)=>)

  constructor() {

  }

}
