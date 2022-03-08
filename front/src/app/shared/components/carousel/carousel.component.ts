import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit{

  @Input()
  photosNumber!: number;

  title = ' '

  img = '../../../assets/images/dish0.jpg' 

  images: string[] = [];

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    for (let i = 0; i < this.photosNumber; i++) {
      this.images.push(`../../../assets/images/dish${i}.jpg`)
    }
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.title = event.urlAfterRedirects.split('/')[1]
        
      }
    });
  }
}

