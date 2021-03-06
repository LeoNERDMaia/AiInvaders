import { MultiLayerPerceptronData } from './../../model/neural-network';
import { GenerationController } from './../../system/GenerationController';
import { AIController } from './../../system/AIController';
import { GameComponent } from './../../SpaceInvaders/Game/Game.component';
import { Game } from './../../model/game';
import { UserProjectsService } from './../../service/UserProjects.service';
import { Project } from '../../model/project';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ScoreChartComponent } from '../ScoreChart/ScoreChart.component';


@Component({
  selector: 'app-ProjectEvolve',
  templateUrl: './ProjectEvolve.component.html',
  styleUrls: ['./ProjectEvolve.component.scss']
})
export class ProjectEvolveComponent implements OnInit {

  evolveRun: any
  finished: boolean = true

  project: Project = new Project()

  games: Game[] = []
  generationController: GenerationController
  aIControllers: AIController[] = []

  showResults: boolean = false

  @ViewChildren('gameComponent') gameComponents: QueryList<GameComponent>
  @ViewChild('scoreChart') scoreChart: ScoreChartComponent
  @ViewChild('generationChart') generationChart: ScoreChartComponent

  constructor(private route: ActivatedRoute, private userProjectService: UserProjectsService) { }

  ngOnInit() {
    let projectName = this.route.snapshot.paramMap.get('project');
    this.userProjectService.find(projectName).subscribe(project => {
      this.project = project.data()
      this.generationController = new GenerationController(this.project.mlpChampion, this.project.mlpBest, this.project.children, this.project.mutationProbability, this.project.mutationFactor)
      this.startEvolve()
    })
  }

  ngDestroy() {
    clearInterval(this.evolveRun)
  }

  private startEvolve() {
    this.generationController.computeGeneration()
    for (let i = 0; i < this.generationController.generationSize; i++) {
      let game: Game = new Game()
      this.games.push(game)
    }
    setTimeout(() => {
      this.startAIPlay()
    }, 500)
  }

  startAIPlay() {
    this.aIControllers = []
    this.gameComponents.forEach((gameComponent, index) => {
      let data: MultiLayerPerceptronData = this.generationController.nextMLP()
      let aiController: AIController = new AIController(gameComponent.gameAnalyser, gameComponent, data)
      this.aIControllers.push(aiController)
    })
    this.finished = false
    setTimeout(() => this.doEvolve(), 5)
  }

  private doEvolve() {
    this.gameComponents.forEach(gameComponent => {
      gameComponent.doGameMove()
      if (!gameComponent.game.active) {
        let indexGame: number = this.games.indexOf(gameComponent.game)
        this.games.splice(indexGame, 1)
      }
    })
    let gamesOver: AIController[] = []
    this.aIControllers.forEach(aiControler => {
      if (aiControler.gameOver()) {
        aiControler.doGame()
        this.scoreChart.updateData(aiControler.mlpData.score / 200)
        this.generationController.addMLPScore(aiControler.mlpData)
        gamesOver.push(aiControler)
      } else
        aiControler.doGame()
    })
    gamesOver.forEach(aiController => {
      let indexAIController = this.aIControllers.indexOf(aiController)
      this.aIControllers.splice(indexAIController, 1)
    })

    if (this.gameComponents.length == 0){
      setTimeout(() => this.startEvolve(), 500)
      this.generationChart.updateData(this.generationController.champion.score / 200)
    } else {
      setTimeout(() => this.doEvolve(), 5)
    }
  }

}
