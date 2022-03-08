import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu, MenuService, MenuSubject } from '../../service/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  
})
export class MenuCardComponent implements OnInit, OnDestroy {

  title = '';
  cart: Menu[] = [];
  getMenuBySubjectSubscription?: Subscription;
  getSubjectValueSubscription?: Subscription;
  menuCards: MenuSubject[] = [];

  constructor(private activeRoute: ActivatedRoute, private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.getSubjectValueSubscription = this.menuService.getSubjectValue()
      .subscribe(
        res => {
          this.title = res;
          if(res){
            this.getMenuBySubjectSubscription = this.menuService.getMenuBySubject(this.title)
            .subscribe(
              res => { this.menuCards = res; },
              err => { console.log(err) }
            )
          }
        },
      );    
  }

  ngOnDestroy() {
    this.getMenuBySubjectSubscription?.unsubscribe();
    this.getSubjectValueSubscription?.unsubscribe();
  }

  addToCart(item: Menu){ 
    if(localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
    } 
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(JSON.parse(localStorage.getItem('cart')|| '{}'));
  }

}