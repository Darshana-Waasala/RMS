import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { AppComponent, DialogOverviewExampleDialog } from './app.component';

// @NgModule({
//   imports: [
//     MatFormFieldModule,
//     CdkTableModule,
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatButtonToggleModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatChipsModule,
//     MatStepperModule,
//     MatDatepickerModule,
//     MatDialogModule,
//     MatExpansionModule,
//     MatGridListModule,
//     MatIconModule,
//     MatInputModule,
//     MatListModule,
//     MatMenuModule,
//     MatNativeDateModule,
//     MatPaginatorModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatSliderModule,
//     MatSlideToggleModule,
//     MatSnackBarModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     MatToolbarModule,
//     MatTooltipModule
//   ],
//   exports: [
//     MatFormFieldModule,
//     CdkTableModule,
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatButtonToggleModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatChipsModule,
//     MatStepperModule,
//     MatDatepickerModule,
//     MatDialogModule,
//     MatExpansionModule,
//     MatGridListModule,
//     MatIconModule,
//     MatInputModule,
//     MatListModule,
//     MatMenuModule,
//     MatNativeDateModule,
//     MatPaginatorModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatSliderModule,
//     MatSlideToggleModule,
//     MatSnackBarModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     MatToolbarModule,
//     MatTooltipModule
//   ]
// })

// export class MatModule {}


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    MatModule, // for angular material
    RoutingModule,
    ServicesModule,
    ViewsModule,
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
