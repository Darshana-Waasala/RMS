import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatModule } from "./mat.module";


import { RoutingModule } from "./routing/routing.module";
import { ServicesModule } from "./services/services.module";
import { ViewsModule } from "./views/views.module";

import { GeneralService } from './services/general.service';

import { AppComponent, DialogOverviewExampleDialog } from './app.component';


@NgModule({

  imports: [
    ServicesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatModule, // for angular material
    RoutingModule,
    ViewsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog
  ],
  entryComponents: [
    AppComponent, 
    DialogOverviewExampleDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
