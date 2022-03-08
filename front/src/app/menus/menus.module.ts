import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { MenusRoutingModule } from './menus-routing.module';


@NgModule({
  declarations: [
    MenuCardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenusRoutingModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class MenusModule {

  
 }
