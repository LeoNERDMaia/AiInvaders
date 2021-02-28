import { AuthService } from 'src/app/service/auth.service';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public logged: boolean;
  public user: User;

  constructor(private auth: AuthService) {}

  public getPath(): Observable<string> {
    return this.auth.getLoggedUser().pipe(
      map((user) => {
        return `users/${user.$id}`
      })
    );
  }
}
