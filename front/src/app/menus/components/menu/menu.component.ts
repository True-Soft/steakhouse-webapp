import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuPositions: string[] = [];
  activeSubject = '';


  constructor (private menuService: MenuService) {
    this.menuService.getSubjects()
      .subscribe(
        res => {
          this.menuPositions = res;
        },
        err => {
          console.log(err)
        }
      )
  }

  ngOnInit(): void {
    
  }

  activeBtn(subjectToActivate: string) {
    this.activeSubject = subjectToActivate;
  }

}
