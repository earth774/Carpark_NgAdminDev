import { Injectable } from '@angular/core';
import { Rfid } from '../interfaces/Rfid';
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
export class RfidService {

  rfid: Rfid[];
  rfid_all: Rfid[];

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
    * Rfid_user Added & Available method for pull data
    */
  showRfidObserve(): Observable<Rfid[]> {
    return new Observable<Rfid[]>((observer) => {
      this.showRfid().subscribe(res => {
        this.rfid = res;
        observer.next(this.rfid);
      });
      setInterval( () => {
        this.showRfid().subscribe(res => {
          this.rfid = res;
          observer.next(this.rfid);
        });
      }, 5000);
    });
  }
  showRfidObserv(): Observable<Rfid[]> {
    return new Observable<Rfid[]>((observer) => {
      this.showRfid().subscribe(res => {
        this.rfid = res;
        observer.next(this.rfid);
      });
      setInterval( () => {
        observer.next(this.rfid);
      }, 1000);
    });
  }
  showRfidAllObserv(): Observable<Rfid[]> {
    return new Observable<Rfid[]>((observer) => {
      this.showRfidAll().subscribe(res => {
        this.rfid_all = res;
        observer.next(this.rfid_all);
      });
      setInterval( () => {
        observer.next(this.rfid_all);
      }, 1000);
    });
  }

  showRfid(): Observable<Rfid[]> {
    return this.http.get(localStorage.getItem('isUrl') + 'api/rfid/no/user', this.options).map((res: Response) => res.json().Rfid);
  }
  showRfidAll(): Observable<Rfid[]> {
    return this.http.get(localStorage.getItem('isUrl') + 'api/rfid/all', this.options).map((res: Response) => res.json().Rfid);
  }

  delete(id): boolean {
    const index = this.rfid.findIndex(i => i.rfid === id);
    if (index !== -1) {
      this.http.delete(localStorage.getItem('isUrl') + 'api/rfid/delete/' + id, this.options).subscribe(
        res => {
          this.rfid.splice(index, 1);
          const indexx = this.rfid_all.findIndex(i => i.rfid === id);
          if (indexx !== -1) {
            this.rfid_all.splice(indexx, 1);
            return true;
          }
        },
        error => {
          return false;
        });
      return true;
    }
    return false;
  }
}
