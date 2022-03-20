import {  Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItems, Menu, MenuService, MenuSubject } from 'src/app/menus/service/menu.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(document:storage)': 'onStorageChange($event)'
  }
})

export class NavbarComponent implements OnInit {
  getSubjectsSubscription?: Subscription;

  subject = '';
  scrollTop = window.scrollY;

  cart: CartItems[] = [];
  cartActive = false;
  totalPrice = 0;
  totalItemsInCart = 0;

  constructor(
    private menuService: MenuService,
    private storage: StorageService
  ) {  }

  ngOnInit(): void {
    this.initCart()
    window.addEventListener('scroll', this.scroll, true);
    this.getSubjectsSubscription = this.menuService.getSubjects()
      .subscribe(
        res => {
          this.subject = res[0];
        },
        err => {
          console.log(err)
        }
      )
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
    this.getSubjectsSubscription?.unsubscribe();
  }


  scroll = (event: Event): void => {
    this.scrollTop = window.scrollY;
  };

  setSubject(){
    this.menuService.setSubjectValue(this.subject);
  }

  openCart(){
    this.cartActive = true;
  }

  closeCart(){
    this.cartActive = false;
  }

  initCart(){
    this.storage.saveValue('cart', JSON.stringify([]));

    if( JSON.parse(this.storage.retrieveValue('cart')) ){
      this.cart = JSON.parse(this.storage.retrieveValue('cart'));
      //console.log(this.cart);
      for (let i = 0; i < this.cart.length; i++) {
        this.totalItemsInCart += this.cart[i].count
        this.totalPrice += this.cart[i].count*this.cart[i].item.price;
      }
    }

    this.storage.observeStorageIten('cart')
      .subscribe((value) => {
        if (value) {
          this.cart = JSON.parse(this.storage.retrieveValue('cart'));
          this.totalItemsInCart = 0;
          this.totalPrice = 0;
          for (let i = 0; i < this.cart.length; i++) {
            this.totalItemsInCart += this.cart[i].count
            this.totalPrice += this.cart[i].count*this.cart[i].item.price;
          }
        }
      });
  }

  addItem(title: string, count: number){
    for (let i = 0; i < this.cart.length; i++) {
      if(this.cart[i].item.title == title && count > 0 ) {
        this.cart[i].count++;
        break;
      }
    }
    this.storage.saveValue('cart', JSON.stringify(this.cart));
    //console.log(JSON.parse(this.storage.retrieveValue('cart')));
  }

  deleteItem(title: string, count: number){
    for (let i = 0; i < this.cart.length; i++) {
      if(this.cart[i].item.title == title &&  count > 0 ) {
        this.cart[i].count--;
        if(this.cart[i].count == 0) this.cart.splice(i,1);
        break;
      }
    }
    this.storage.saveValue('cart', JSON.stringify(this.cart));
    //console.log(JSON.parse(this.storage.retrieveValue('cart')));
  }
}