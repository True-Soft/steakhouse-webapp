import {  Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItems, Menu, MenuService, MenuSubject } from 'src/app/menus/service/menu.service';
import { CartService, Cart } from 'src/app/services/cart/cart.service';
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
  cartSubscription?: Subscription;
  routerEventsSubscription?: Subscription;

  subject = '';
  title = '';

  scrollTop = window.scrollY;

  cart: CartItems[] = [];
  cartActive = false;
  totalPrice = 0;
  totalItemsInCart = 0;

  navbarPosition = 'p-fixed';

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.cartSubscription = this.initCart();

    window.addEventListener('scroll', this.scroll, true);

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.title = event.urlAfterRedirects.split('/')[1];
        if(this.title == "order") {
          this.scrollTop = 1
          this.navbarPosition = "p-inherit"
        };
      }
    });
    
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
    this.cartSubscription?.unsubscribe();
  }


  scroll = (event: Event): void => {
    if(this.title != "order") {
      this.scrollTop = window.scrollY
      this.navbarPosition = "p-fixed"
    };
      
  };

  setSubject(){
    this.menuService.setSubjectValue(this.subject);
  }

  initCart(){
    return this.cartService.observeCart()
      .subscribe((value ) =>{
          this.cart = value.items;
          this.totalItemsInCart = value.totalItemsInCart;
          this.totalPrice = value.totalPrice;
          console.log(this.cart)
        }
      )
  }

  openCart(){
    this.cartActive = true;
  }

  addItemToCart(title: string, count: number){
    this.cartService.addItemToCart(title, count)
  }

  removeItemFromCart(title: string, count: number){
    this.cartService.removeItemFromCart(title, count)
  }

  closeCart(){
    this.cartActive = false;
  }
}