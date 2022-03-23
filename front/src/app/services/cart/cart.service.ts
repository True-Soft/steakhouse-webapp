import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItems, Menu } from 'src/app/menus/service/menu.service';
import { StorageService } from '../storage/storage.service';

export interface Cart {
  items: CartItems[],
  totalPrice: number,
  totalItemsInCart: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = {
    items: [] as CartItems[],
    totalPrice: 0,
    totalItemsInCart : 0
  };

  cartTracker = new BehaviorSubject<Cart>(this.cart)

  constructor(private storage: StorageService) {
    this.initCart();
  }

  initCart(){
    if(!this.checkCart()) this.saveCart()

    if(this.checkCart()){
      this.cart.items = this.getItemsFromCart();
      for (let i = 0; i < this.cart.items.length; i++) {
        this.cart.totalItemsInCart += this.cart.items[i].count
        this.cart.totalPrice += this.cart.items[i].count*this.cart.items[i].item.price;
      }
      this.cartTracker.next(this.cart)
    }

    this.storage.observeStorageItem('cart')
      .subscribe((value) => {
        if (value) {
          this.cart.items = this.getItemsFromCart();
          this.cart.totalItemsInCart = 0;
          this.cart.totalPrice = 0;
          for (let i = 0; i < this.cart.items.length; i++) {
            this.cart.totalItemsInCart += this.cart.items[i].count
            this.cart.totalPrice += this.cart.items[i].count*this.cart.items[i].item.price;
          }
          this.cartTracker.next(this.cart)
        };
      });
  }

  addToCart(item: Menu){ 
    let added = false;
    if(this.checkCart()) {
      for (let i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].item.title == item.title) {
          this.cart.items[i].count++;
          added = true
          break;
        };
      }
    } 
    if (!added) this.cart.items.push({item: item, count: 1});
    this.saveCart()
  }

  addItemToCart(title: string, count: number){
    for (let i = 0; i < this.cart.items.length; i++) {
      if(this.cart.items[i].item.title == title && count > 0 ) {
        this.cart.items[i].count++;
        break;
      }
    }
    this.saveCart()
  }

  removeItemFromCart(title: string, count: number){
    for (let i = 0; i < this.cart.items.length; i++) {
      if(this.cart.items[i].item.title == title &&  count > 0 ) {
        this.cart.items[i].count--;
        if(this.cart.items[i].count == 0) this.cart.items.splice(i,1);
        break;
      }
    }
    this.saveCart()
  }

  getItemsFromCart(): CartItems[]{
    return JSON.parse(this.storage.retrieveValue('cart'));
  }

  saveCart(){
    this.storage.saveValue('cart', JSON.stringify(this.cart.items));
  }

  clearCart(){
    this.storage.saveValue('cart', JSON.stringify([]));
  }

  checkCart(){
    if(JSON.parse(this.storage.retrieveValue('cart'))) return true;
    return false
  }

  observeCart(){
    return this.cartTracker;
  }
}
