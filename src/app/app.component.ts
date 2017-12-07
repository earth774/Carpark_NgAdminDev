import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    const urls = ['http://127.0.0.1:8000/', 'http://phufa-public.ddns.net:1234/', 'http://api.upcarpark.xyz/'];
    localStorage.setItem('isUrl', urls[2]);

  }
}
