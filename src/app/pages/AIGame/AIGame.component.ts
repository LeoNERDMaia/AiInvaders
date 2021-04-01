import { GameComponent } from './../../SpaceInvaders/Game/Game.component';
import { AIController } from './../../system/AIController';
import { MultiLayerPerceptronData } from './../../model/neural-network';
import { Game } from './../../model/game';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProjectsService } from 'src/app/service/UserProjects.service';
import { GenerationController } from 'src/app/system/GenerationController';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-AIGame',
  templateUrl: './AIGame.component.html',
  styleUrls: ['./AIGame.component.scss']
})
export class AIGameComponent implements OnInit {

  project: Project = new Project()
  game: Game = new Game()
  aIController: AIController
  mlpData: MultiLayerPerceptronData
  @ViewChild('gameComponent') gameComponent: GameComponent

  constructor(private route: ActivatedRoute, private userProjectService: UserProjectsService, private router: Router) { }

  ngOnInit() {
    let projectName = this.route.snapshot.paramMap.get('project');
    this.userProjectService.find(projectName).subscribe(project => {
      this.project = project.data()
      this.mlpData = this.project.mlpChampion
      this.startPlay()
    })
  }

  private startPlay() {
    this.aIController = new AIController(this.gameComponent.gameAnalyser, this.gameComponent, this.mlpData)
    setTimeout(() => this.doEvolve(), 15)
  }

  private doEvolve() {
    this.gameComponent.doGameMove()
    this.aIController.doGame()
    if (!this.gameComponent.game.active) {
      this.game = new Game()
      this.gameComponent.game = this.game
      this.gameComponent.restart()
      setTimeout(() => this.startPlay(), 500)
    } else {
      setTimeout(() => this.doEvolve(), 15)
    }
  }

  onBack() {
    this.router.navigate(['projects'])
  }

}
