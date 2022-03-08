import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  getSubjectsSubscription?: Subscription;
  getSubjectValueSubscription?: Subscription;
  menuPositions: string[] = [];
  activeSubject = '';

  constructor (private activeRoute: ActivatedRoute, private menuService: MenuService) {
    
  }

  ngOnInit(): void {
    this.getSubjectValueSubscription = this.menuService.getSubjectValue().subscribe((value) => {
      this.activeSubject = value;
    });
    
    this.getSubjectsSubscription = this.menuService.getSubjects()
      .subscribe(
        res => {
          this.menuPositions = res;
          this.menuService.setSubjectValue(res[0]);
        },
        err => {
          console.log(err)
        }
      )
  }

  ngOnDestroy() {
    this.getSubjectsSubscription?.unsubscribe();
    this.getSubjectValueSubscription?.unsubscribe();
  }

  activeBtn(subjectToActivate: string) {
    this.menuService.setSubjectValue(subjectToActivate);
  }

}
