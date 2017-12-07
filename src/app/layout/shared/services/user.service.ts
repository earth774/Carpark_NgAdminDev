import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

// import the important
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import the important

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class UserService {
  user: User[];
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('isToken')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /*
   * Register user
   */
  store(data): Observable<any> {
    return this.http.post(localStorage.getItem('isUrl') + 'api/user/add', data, this.options).map((res: Response) => res.json());
  }

  show(): Observable<User[]> {
    return this.http.get(localStorage.getItem('isUrl') + 'api/user/all', this.options).map((res: Response) => res.json().users);
  }

  showObserv(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      this.show().subscribe(res => {
        this.user = res;
        observer.next(this.user);
      });
      setInterval( () => {
        observer.next(this.user);
      }, 1000);
    });
  }

  /*
    * Action Delete
    */
  delete(id) {
    const index = this.user.findIndex(i => i.id === id);
    if (index !== -1) {
      this.http.delete(localStorage.getItem('isUrl') + 'api/user/delete/' + id, this.options).subscribe(
        res => {
          this.user.splice(index, 1);
          return true;
        }, error => {
          return false;
        }
      );
      return true;
    } else {
      return false;
    }
  }

}
