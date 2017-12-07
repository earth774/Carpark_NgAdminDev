import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  logged: boolean;

  loading: boolean;
  loadMsg: string;

  constructor(public router: Router, private loginService: LoginService) {
    this.loading = false;
    this.logged = false;
    if (localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  toLogin(e) {
    this.loading = true;
    this.logged = false;
    e.preventDefault();
    this.email = e.target.email.value;
    this.password = e.target.password.value;
    this.loginService.getLogin(this.email, this.password).subscribe(
      (res: Response) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isName', res[0].name);
        localStorage.setItem('isEmail', res[0].email);
        localStorage.setItem('isToken', res[0].api_token);
        this.waitLogin();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      (error: Response) => {
        console.log(error);
        this.loading = false;
        this.logged = true;
      }
    );
  }

  waitLogin(){
    this.loading = true;
    this.loadMsg = 'กำลังตรวจสอบกรุณารอสักครู่ .';
    setTimeout(() => {this.loadMsg += ' .'; }, 1000);
    setTimeout(() => {this.loadMsg += ' .'; }, 1800);
    setTimeout(() => {this.loadMsg += ' .'; }, 2500);
  }

}
