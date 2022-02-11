import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCardComponent } from './components/menu-card/menu-card.component';

const routes: Routes = [
  {path: ':subject', component: MenuCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenusRoutingModule { 

  

}