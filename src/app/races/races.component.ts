import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import RaceModel from '../models/race.model';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: RaceModel[] = [{ name: 'Lyon' }, { name: 'London' }];
}
