import { Project } from './../../model/project';
import { MultiLayerPerceptron, MultiLayerPerceptronData } from './../../model/neural-network';
import { NavigationError, Router } from '@angular/router';
import { UserProjectsService } from './../../service/UserProjects.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-EditProject',
  templateUrl: './EditProject.component.html',
  styleUrls: ['./EditProject.component.scss']
})
export class EditProjectComponent implements OnInit {

  project: Project = new Project()
  hiddenLayers: string
  hiddenSize: string
  outputType: number = 2
  generationSize: string

  //outputTypes: number[] = [2, 3]

  outputTypes = [{value: 2, name: "2 Outputs (move and fire)"}, {value: 3, name: "3 Outputs (Left, Right and Fire)"}]

  constructor(private userProjectsSerivce: UserProjectsService, private router: Router) { }

  ngOnInit() {
  }

  onAddProject() {
    let outputSize = this.outputType
    let mlpChampion: MultiLayerPerceptronData = MultiLayerPerceptron.buildRandomNetwork(Project.inputSize, outputSize, parseInt(this.hiddenLayers), parseInt(this.hiddenSize), 0)
    let mlpBest: MultiLayerPerceptronData = MultiLayerPerceptron.buildRandomNetwork(Project.inputSize, outputSize, parseInt(this.hiddenLayers), parseInt(this.hiddenSize), 0)
    this.project.mlpChampion = mlpChampion
    this.project.mlpBest = mlpBest
    this.project.children = parseInt(this.generationSize)
    this.project.outputSize = outputSize
    this.userProjectsSerivce.updateProject(this.project).subscribe(value =>
      this.back())
  }

  back() {
    this.router.navigate(['projects'])
  }

}
