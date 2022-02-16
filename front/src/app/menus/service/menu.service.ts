import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Menu {
  _id: string,
  title: string,
  price: string,
  priceComment?: string,
  header?: string,
  subject: string,
}

export interface Subject {
  header: string,
  menus: Menu[],
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private getSubjectsURL = 'http://localhost:3000/menu/subjects';
  private getMenuBySubjectURL = 'http://localhost:3000/menu/';

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get<string[]>(this.getSubjectsURL);
  }

  getMenuBySubject(subject: string) {
    return this.http.get<Subject[]>(this.getMenuBySubjectURL + subject);
  }


}
