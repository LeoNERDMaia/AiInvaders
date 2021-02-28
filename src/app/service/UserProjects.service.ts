import { Project } from './../model/project';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Store } from './store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MultiLayerPerceptron } from '../model/neural-network';

@Injectable({
  providedIn: 'root',
})
export class UserProjectsService extends Store<Project> {
  constructor(
    protected firestore: AngularFirestore,
    protected userService: UserService
  ) {
    super('UserProjects', firestore, userService);
  }

  public updateProject(project: Project): Observable<Project> {
    project['$id'] = project.name
    let obj = {...project}
    obj.mlpLow = {...project.mlpLow}

    return this.change(obj)
    /*return this.change(obj).pipe(map(value => {
      this.changeAt(project.name + "/mlp", mlpLow).subscribe()
      return value
    }))*/
  }

  public all(): Observable<Array<Project>> {
    return this.query((s) => s.orderBy('name')).pipe(
      map((items) => {
        return items.map((item) => {
          let project = item.payload.doc.data() as Project;
          project['$id'] = item.payload.doc.id;
          return project;
        });
      })
    );
  }
}
