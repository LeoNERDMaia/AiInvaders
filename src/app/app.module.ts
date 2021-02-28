import { SpaceInvadersModule } from './SpaceInvaders/SpaceInvaders.module';
import { UserProjectsService } from './service/UserProjects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database"

import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app.routing';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { AuthGuard } from './service/security.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,

    PagesModule,
    SpaceInvadersModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserProjectsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
