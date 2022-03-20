import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  menuCards: MenuSubject[] = [];

  constructor(
    private menuService: MenuService,
    private storage: StorageService
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
          }
        },
      );    
  }

  ngOnDestroy() {
    this.getMenuBySubjectSubscription?.unsubscribe();
    this.getSubjectValueSubscription?.unsubscribe();
  }

  addToCart(item: Menu){ 
    let added = false;
    if(this.storage.retrieveValue('cart')) {
      this.cart = JSON.parse(this.storage.retrieveValue('cart'));

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].item.title == item.title) {
          this.cart[i].count++;
          added = true
        };
      }
    } 
    
    if (!added) this.cart.push({item: item, count: 1});
    this.storage.saveValue('cart', JSON.stringify(this.cart));
    //console.log(JSON.parse(this.storage.retrieveValue('cart')));
  }
}