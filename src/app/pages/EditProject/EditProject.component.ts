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

  constructor(private userProjectsSerivce: UserProjectsService, private router: Router) { }

  ngOnInit() {
  }

  onAddProject() {
    let hiddensCount: number[] = []
    let mlpData: MultiLayerPerceptronData = MultiLayerPerceptron.buildRandomNetwork(Project.inputSize, Project.outputSize, parseInt(this.hiddenLayers), parseInt(this.hiddenSize), 0)
    this.project.mlpLow = mlpData
    this.userProjectsSerivce.updateProject(this.project).subscribe(value =>
      this.back())
  }
  back() {
    this.router.navigate(['projects'])
  }

}
