import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  getLogin(email: string, pass: string): Observable <any> {
    const body = {email: email, password: pass};
    return this.http.post(localStorage.getItem('isUrl') + 'api/auth/login', body)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
