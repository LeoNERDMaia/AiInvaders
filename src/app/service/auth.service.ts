import { UserService } from './user.service';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   *
   */
  private authState: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth) {
      this.authState = this.afAuth.authState
  }

  /**
   *
   */
  public signIn() : Observable<firebase.auth.UserCredential>{
      return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
  }

  /**
   *
   */
  public signOut(): Observable<void> {
    return from(this.afAuth.signOut())
  }

  /**
   *
   */
  public getLoggedUser() : Observable<User> {
      return this.authState.pipe(map(user => {

          if(user){
              return {
                  $id: user.uid,
                  name: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL
              }
          }

          return null
      }))
  }

  /**
   * Returns true if user is logged in;
   */
  public isAuthenticated(): Observable<boolean> {
      return this.authState.pipe(map(user => {
          return user != null
      }));
  }
}
