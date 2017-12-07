import { Injectable } from '@angular/core';
import { Location } from '../interfaces';

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
export class LocationService {

  location: Location[];

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

  store(data): Observable <any> {
    return this.http.post(localStorage.getItem('isUrl') + 'api/locate/add', data, this.options)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  showObserv(): Observable<Location[]> {
    return new Observable<Location[]>(
      subscriber => {
        this.show(). subscribe(res => {
          this.location = res;
          subscriber.next(this.location);
        }, error => {
          this.location = [];
          subscriber.next(this.location);
        });
        setInterval(() => {
          subscriber.next(this.location);
        }, 1000);
      }
    );
  }
  show(): Observable<Location[]> {
    return this.http.get(localStorage.getItem('isUrl') + 'api/locate/all', this.options).map((res: Response) => res.json().LocationAll);
  }

  update(): Observable <any> {
    return this.http.get(localStorage.getItem('isUrl') + 'api/locate/all', this.options).map((res: Response) => this.location = res.json().LocationAll);
  }

  delete(id) {
    const index = this.location.findIndex(i => i.locate_id === id);
    if (index !== -1) {
      this.http.delete(localStorage.getItem('isUrl') + 'api/locate/delete/' + id, this.options).subscribe(
        res => {
          this.location.splice(index, 1);
          return true;
        },
        error => {
          return false;
        });
      return true;
    } else {
      return false;
    }
  }
}
