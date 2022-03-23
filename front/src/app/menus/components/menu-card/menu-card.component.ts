import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CartItems, Menu, MenuService, MenuSubject } from '../../service/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  
})
export class MenuCardComponent implements OnInit, OnDestroy {

  title = '';
  cart: CartItems[] = [];
  getMenuBySubjectSubscription?: Subscription;
  getSubjectValueSubscription?: Subscription;
  cartSubscription?: Subscription;

  menuCards: MenuSubject[] = [];

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {  }

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
          };
        }
      );    
  }

  ngOnDestroy() {
    this.getMenuBySubjectSubscription?.unsubscribe();
    this.getSubjectValueSubscription?.unsubscribe();
  }

  addToCart(item: Menu){ 
    this.cartService.addToCart(item);
  }
}