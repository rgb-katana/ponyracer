import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import RaceModel from '../models/race.model';

@Component({
  selector: 'pr-race',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent {
  @Input({ required: true }) raceModel!: RaceModel;
}
