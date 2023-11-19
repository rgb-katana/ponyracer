import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'https://ponyracer.ninja-squad.com';

  constructor(private http: HttpClient) {}

  register(login: string, password: string, birthYear: number) {
    return this.http.post<UserModel>(`${this.BASE_URL}/api/users`, {
      login,
      password,
      birthYear
    });
  }
}
