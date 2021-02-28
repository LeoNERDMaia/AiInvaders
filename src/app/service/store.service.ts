import { UserService } from './user.service';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Service that provides a generic mapping layer between Angular and Firebase.
 * You should extend this class.
 */
export abstract class Store<T> {

    /**
     * Creates an instance of Store.
     *
     * @param pathName : It's the path name of the collection in Firebase;
     * @param firestore : It's service that allows you to work with Cloud Firestore;
     * @param system : It's the service that provides the collection path;
     */
    constructor(
        protected pathName: string,
        protected firestore: AngularFirestore,
        protected userService: UserService) { }

    /**
     * Get all records matching the specified query;
     *
     * @param queryFn : custom query;
     */
    public query(queryFn?: QueryFn) : Observable<any>{
        return this.userService.getPath().pipe(concatMap(path => {
            return this.firestore.collection<T>(`${path}/${this.pathName}`, queryFn).snapshotChanges()
        }));
    }

    /**
     * Get one records matching the specified key;
     *
     * @param id: It's the key of the entity class that you want to find;
     */
    public find(id: any): Observable<any> {
        return this.userService.getPath().pipe(concatMap(path => {
            return this.firestore.collection<T>(`${path}/${this.pathName}`).doc(id).get();
        }));
    }

    /**
     * Add a record with the supplied data record;
     *
     * @param record: It's the data record that you want to add;
     */
    public add(record: any): Observable<any> {

        let obj = { ...record }
        delete obj['$id'];

        return this.userService.getPath().pipe(concatMap(path => {
            return this.firestore.collection(`${path}/${this.pathName}`).add(obj);
        }));
    }

    /**
     * Update one record matching the specified key with data;
     *
     * @param record: It's the data record that you want to chnage;
     */
    public change(record: any): Observable<any> {

        let obj = { ...record }
        delete obj['$id'];

        return this.userService.getPath().pipe(concatMap(path => {
            return this.firestore.doc(`${path}/${this.pathName}/${record.$id}`).set(obj);
        }));
    }

    public changeAt(morePath: string, record: any): Observable<any> {

      let obj = { ...record }
      delete obj['$id'];

      return this.userService.getPath().pipe(concatMap(path => {
          return this.firestore.doc(`${path}/${this.pathName}/${morePath}/${record.$id}`).set(obj);
      }));
  }

    /**
     * Delete one record matching the specified key;
     *
     * @param id: It's the key of the entity class you want to delete;
     */
    public remove(id: string): Observable<any> {
        return this.userService.getPath().pipe(concatMap(path => {
            return this.firestore.doc(`${path}/${this.pathName}/${id}`).delete()
        }));
    }
}
