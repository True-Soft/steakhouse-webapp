import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';

import { Menu } from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuPositions = []

  constructor (private menuService: MenuService) {
    this.menuService.getSubjects()
      .subscribe(
        res => {
          this.menuPositions = res;
          console.log(this.menuPositions);
        },
        err => {
          console.log(err)
        }
      )
  }

  ngOnInit(): void {
    
  }

}
