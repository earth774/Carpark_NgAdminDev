import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryAccessComponent } from './history-access.component';

const routes: Routes = [{
  path: '', component: HistoryAccessComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryAccessRoutingModule { }
