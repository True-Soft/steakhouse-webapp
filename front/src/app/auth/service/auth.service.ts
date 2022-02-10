import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User{
  _id?: string;
  email?: string;
  password?: string;
  createdDate?: string;
  points?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private signupURL = '/api/auth/signup';
  private loginURL = '/api/auth/login';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this.signupURL, user);
  }
  loginUser(user: User) {
    return this.http.post<any>(this.loginURL, user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
}