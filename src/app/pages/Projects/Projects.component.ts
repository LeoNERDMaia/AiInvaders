import { Game } from './../../model/game';
import { Router } from '@angular/router';
import { UserProjectsService } from './../../service/UserProjects.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-Projects',
  templateUrl: './Projects.component.html',
  styleUrls: ['./Projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Array<Project> = []

  constructor(private userProjectsService: UserProjectsService, private router: Router) {

   }

  ngOnInit() {
    this.userProjectsService.all().subscribe(projects => {
      this.projects = projects
    })
  }

  onNewProject() {
    this.router.navigate(["editProject"])
  }

  onPlayGame() {
    this.router.navigate(["playgame"])
  }

  onDeleteProject(projectName: string) {
    this.userProjectsService.remove(projectName).subscribe(() => this.router.navigate(["projects"]))
  }

  onEvolveProject(projectName: string) {
    this.router.navigate([`evolveProject/${projectName}`])
  }

  onPlayProject(projectName: string) {
    this.router.navigate([`aigame/${projectName}`])
  }

}
