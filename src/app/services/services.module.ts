import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http'

import { GeneralService } from './general.service';
import { MessageService } from "./message.service";
import { JsonService } from './json.service';
import { MiddleLayerService } from './middle-layer.service';
import { AuthGuardService } from './auth-guard.service';

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
    MiddleLayerService,
    AuthGuardService
  ]
})
export class ServicesModule { }
