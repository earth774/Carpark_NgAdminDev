import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view.component';
import { MapViewRoutingModule } from './map-view-routing.module';

import { DeviceService, LocationService } from '../shared';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    MapViewRoutingModule,
    Ng2ImgMaxModule,
    DndModule.forRoot(),
  ],
  declarations: [
    MapViewComponent
  ],
  providers: [LocationService, DeviceService]
})
export class MapViewModule { }
