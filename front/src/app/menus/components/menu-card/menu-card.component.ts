import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  
})
export class MenuCardComponent implements OnInit {

  title = '';

  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.title = routeParams.subject;
      
    });
    
  }

}
