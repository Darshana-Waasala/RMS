import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http'

import { GeneralService } from './general.service';
import { MessageService } from "./message.service";
import { JsonService } from './json.service';
import { MiddleLayerService } from './middle-layer.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: [],
  providers:[
    GeneralService,
    MessageService,
    JsonService,
    MiddleLayerService
  ]
})
export class ServicesModule { }
