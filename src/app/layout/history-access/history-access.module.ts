import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryAccessComponent } from './history-access.component';
import { HistoryAccessRoutingModule } from './history-access-routing.module';
@NgModule({
  imports: [
    CommonModule,
    HistoryAccessRoutingModule,
  ],
  declarations: [HistoryAccessComponent]
})
export class HistoryAccessModule { }
