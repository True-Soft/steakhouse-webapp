import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MenusComponent } from './components/menus/menus.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenusComponent,
    ContactsComponent,
    //CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    //CarouselComponent
  ]
})
export class AppModule { }
