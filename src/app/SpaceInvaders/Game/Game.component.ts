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
export class GameComponent implements OnInit, ShipControl {

  left: boolean = false;
  right: boolean = false;
  fire: boolean = false;

  @Input() AIControlled: boolean = false
  @Input() game: Game
  @Input() showResults: boolean = true

  public gameController: GameController = new GameController()
  public gameAnalyser: GameAnalyzer = new GameAnalyzer()

  input0: number = 0
  input1: number = 0
  input2: number = 0
  input3: number = 0
  input4: number = 0
  input5: number = 0

  gameRun

  constructor() {
  }
  ngOnInit() {
    this.startProcedure()
  }

  private startProcedure() {
    this.gameController.game = this.game
    this.gameAnalyser.game = this.game
    if (!this.AIControlled)
      this.gameRun = setInterval(() => {
        this.doGameMove()
      }, 15)
  }

  ngDestroy() {
    if (!this.AIControlled)
      clearInterval(this.gameRun)
  }

  public restart() {
    this.startProcedure()
  }

  public doGameMove() {
    this.gameController.doGameMove(this.left, this.right, this.fire)
    this.input0 = this.gameAnalyser.closestEnemyDistance()
    this.input1 = this.gameAnalyser.mostEnemies()
    this.input2 = this.gameAnalyser.enemyHeight()
    this.input3 = this.gameAnalyser.lineOfFire()
    this.input4 = this.gameAnalyser.protected()
    this.input5 = this.gameAnalyser.horizontalSpeed()
  }

}
