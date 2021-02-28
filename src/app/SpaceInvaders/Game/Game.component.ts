import { GameAnalyzer } from './../../system/GameAnalyzer';
import { GameController } from '../../system/GameController';
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import {ShipControl } from '../../system/ShipControl'

@Component({
  selector: 'app-Game',
  templateUrl: './Game.component.html',
  styleUrls: ['./Game.component.scss']
})
export class GameComponent extends ShipControl implements OnInit {

  @Input() AIControlled: boolean = false

  game: Game = new Game()
  gameController: GameController = new GameController()
  gameAnalyser: GameAnalyzer = new GameAnalyzer()

  input0: number = 0
  input1: number = 0
  input2: number = 0
  input3: number = 0

  gameRun

  constructor() {
    super()
  }

  ngOnInit() {
    this.gameController.game = this.game
    this.gameAnalyser.game = this.game
    this.gameRun = setInterval(() => {
      this.gameController.doGameMove(this.left, this.right, this.fire)
      this.input0 = this.gameAnalyser.closestEnemyDistance()
      this.input1 = this.gameAnalyser.enemyInSight()
      this.input2 = this.gameAnalyser.lineOfFire()
      this.input3 = this.gameAnalyser.protected()
    }, 15)
  }

  ngDestroy() {
  }

}
