import { Component, HostListener, OnInit } from '@angular/core';

interface Dish {
  image: string,
  name: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit{

  img = '../../../assets/images/dish0.jpg' 

  images: string[] = [
    '../../../assets/images/dish1.jpg', 
    '../../../assets/images/dish2.jpg', 
    '../../../assets/images/dish3.jpg'
  ]

  names: string[] = [
    'name one',
    'name two',
    'name three'
  ] 
  showNavigationArrows = true;
  dishes: Dish[] = [
    { image: this.images[0], name: this.names[0] },
    { image: this.images[1], name: this.names[1]},
    { image: this.images[2], name: this.names[2]},
  ];

  constructor() {

  }
  ngOnInit() {

  }
}

