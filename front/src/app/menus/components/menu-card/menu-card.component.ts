import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu, MenuService, Subject } from '../../service/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  
})
export class MenuCardComponent implements OnInit {

  title = '';

  menuCards: Subject[] = [];

  constructor(private activeRoute: ActivatedRoute, private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.title = routeParams.subject;
      this.menuService.getMenuBySubject(this.title)
        .subscribe(
          res => { this.menuCards = res; console.log(this.menuCards) },
          err => { console.log(err) }
        )
    });
    
  }

}
