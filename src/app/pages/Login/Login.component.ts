import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
})
export class LoginComponent implements OnInit {
  public readonly defaultUrl: string = 'assets/img/user.svg'

  constructor(public auth: AuthService, private router: Router, public userService: UserService) {
    this.userService.logged = false
  }

  ngOnInit() {
    this.auth.getLoggedUser().subscribe(user => {
      if(user) {
          this.userService.user = user
          this.userService.logged = true
      };
  });
  }

  public onContinue(): void {
    this.router.navigate(['/projects']);
  }

  public onLogOut(): void {
    this.auth.signOut().subscribe((result) => {
      this.userService.user = null
      this.userService.logged = false
    });
  }

  public onLogIn(): void {
    this.auth.signIn().subscribe((result) => {
      this.router.navigate(['/projects'])
    })
  }
}
