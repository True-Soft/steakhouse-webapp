import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Menu {
  _id: string,
  title: string,
  price: number,
  priceComment?: string,
  header?: string,
  subject: string,
}

export interface MenuSubject {
  header: string,
  menus: Menu[],
}

export interface CartItems {
  item: Menu,
  count: number,
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private getSubjectsURL = 'http://localhost:3000/menu/subjects';
  private getMenuBySubjectURL = 'http://localhost:3000/menu/';

  private activeSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) { 
    this.activeSubject = new BehaviorSubject<string>('');
  }

  getSubjectValue(): Observable<string> {
    return this.activeSubject.asObservable();
  }

  setSubjectValue(newValue : string) {
    this.activeSubject.next(newValue);
  }

  getSubjects() {
    return this.http.get<string[]>(this.getSubjectsURL);
  }

  getMenuBySubject(subject: string) {
    return this.http.get<MenuSubject[]>(this.getMenuBySubjectURL + subject);
  }
}
