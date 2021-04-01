import { Router } from '@angular/router';
import { Game } from './../../model/game';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-PlayerGame',
  templateUrl: './PlayerGame.component.html',
  styleUrls: ['./PlayerGame.component.scss']
})
export class PlayerGameComponent implements OnInit {

  game: Game = new Game()

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['projects'])
  }
}
