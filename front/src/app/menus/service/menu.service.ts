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

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private getSubjectsURL = 'http://localhost:3000/menu/subjects';

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get<String[]>(this.getSubjectsURL);
  }
}
