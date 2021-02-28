import { Game } from './../../model/game';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-GameView',
  templateUrl: './GameView.component.svg',
  styleUrls: ['./GameView.component.scss']
})
export class GameViewComponent implements OnInit {

  @Input() game: Game

  constructor() { }

  ngOnInit() {
  }

}
