import { AIGameComponent } from './pages/AIGame/AIGame.component';
import { PlayerGameComponent } from './pages/PlayerGame/PlayerGame.component';
import { ProjectEvolveComponent } from './pages/ProjectEvolve/ProjectEvolve.component';
import { EditProjectComponent } from './pages/EditProject/EditProject.component';
import { AuthGuard } from './service/security.guard';
import { ProjectsComponent } from './pages/Projects/Projects.component';
import { LoginComponent } from './pages/Login/Login.component';
import { PagesModule } from './pages/pages.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard]},
  { path: 'evolveProject/:project', component: ProjectEvolveComponent, canActivate: [AuthGuard]},
  { path: 'playgame', component: PlayerGameComponent, canActivate: [AuthGuard]},
  { path: 'aigame/:project', component: AIGameComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [
    PagesModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
