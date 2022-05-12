import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './menus/components/menu/menu.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { OrderComponent } from '@components/order/order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'menu', 
    component: MenuComponent, 
    loadChildren : () => import('./menus/menus.module').then(m => m.MenusModule)
  },
  { path: 'contacts', component: ContactsComponent},
  { path: 'order', component: OrderComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
