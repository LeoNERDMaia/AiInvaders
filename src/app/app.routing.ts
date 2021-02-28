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
  { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard]}
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
