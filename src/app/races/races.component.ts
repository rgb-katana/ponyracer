import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [CommonModule, RaceComponent],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  constructor(private raceService: RaceService) {}

  races: RaceModel[] = [];

  ngOnInit(): void {
    this.raceService.list().subscribe((races: RaceModel[]) => (this.races = races));
  }
}
