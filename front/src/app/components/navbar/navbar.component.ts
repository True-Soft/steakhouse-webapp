import {  Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/menus/service/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  getSubjectsSubscription?: Subscription;

  subject = '';
  scrollTop = window.scrollY;

  cartActive = false;
  totalPrice = 0;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
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

}
