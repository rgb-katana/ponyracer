import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://ponyracer.ninja-squad.com';

  params = {
    status: 'PENDING'
  };

  list() {
    return this.http.get<Array<RaceModel>>(`${this.BASE_URL}/api/races`, { params: this.params });
  }
}
