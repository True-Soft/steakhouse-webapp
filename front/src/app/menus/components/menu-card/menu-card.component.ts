import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../service/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  
})
export class MenuCardComponent implements OnInit {

  title = '';
  menuCards: Menu[] = [];

  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.title = routeParams.subject;
      
    });
    
  }

}
