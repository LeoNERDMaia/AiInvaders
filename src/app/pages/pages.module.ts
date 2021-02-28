import { SpaceInvadersModule } from './../SpaceInvaders/SpaceInvaders.module';
import { EditProjectComponent } from './EditProject/EditProject.component';
import { ProjectsComponent } from './Projects/Projects.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './Login/Login.component';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    CommonModule,
    SpaceInvadersModule
  ],
  declarations: [LoginComponent, ProjectsComponent, EditProjectComponent],
  exports: [LoginComponent, ProjectsComponent, EditProjectComponent]
})
export class PagesModule { }