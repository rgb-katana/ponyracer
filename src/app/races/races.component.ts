import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [CommonModule, RaceComponent],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  constructor(private raceService: RaceService) {}

  races = this.raceService.list();
}
