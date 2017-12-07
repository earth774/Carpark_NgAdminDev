import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

import { DeviceService, LocationService } from '../shared';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    Ng2ImgMaxModule,
    DndModule.forRoot(),
  ],
  declarations: [
    MapComponent
  ],
  providers: [LocationService, DeviceService]
})
export class MapModule { }
