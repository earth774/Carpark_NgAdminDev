import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    id: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'หน้าหลัก',  icon: 'dashboard', class: '', id: 'dashboard' },
    { path: '/map-view', title: 'ดู',  icon:'pageview', class: '', id: 'map-view' },
    { path: '/maps', title: 'จัดตำแหน่งอุปกรณ์',  icon:'location_on', class: '', id: 'maps' },
    { path: '/user', title: 'สมาชิก',  icon:'person', class: '', id: 'user' },
    { path: '/history', title: 'ประวัติ',  icon:'person', class: '', id: 'user' },
    /*{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '', id: 'user-profile' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '', id: 'table-list' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '', id: 'typography' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '', id: 'icons' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', id: 'notifications' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    /*var titlee = this.location.prepareExternalUrl(this.location.path());
    setTimeout(function () {
      if (titlee == '/') { 
          const btn = <HTMLElement>document.getElementById('dashboard');
          btn.click();
      }
    }, 200);*/
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  onLoggedout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isName');
    localStorage.removeItem('isEmail');
    localStorage.removeItem('isToken');
    this.router.navigate(['/login']);
  }
}
