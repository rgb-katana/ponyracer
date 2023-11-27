import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'https://ponyracer.ninja-squad.com';
  userEvents = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${this.BASE_URL}/api/users`, body);
  }

  retrieveUser() {
    const storedUser = window.localStorage.getItem('rememberMe');
    if (storedUser) {
      this.userEvents.next(JSON.parse(storedUser));
    }
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.BASE_URL}/api/users/authentication`, credentials)
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
  }
}
