import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

  

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'dashboard', loadChildren: './home/home.module#HomeModule'},
      {path: 'maps', loadChildren: './map/map.module#MapModule'},
      {path: 'map-view', loadChildren: './map-view/map-view.module#MapViewModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'},
      { path: 'history', loadChildren: './history-access/history-access.module#HistoryAccessModule' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
