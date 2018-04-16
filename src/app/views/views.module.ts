import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../mat.module';
import { CommonModule } from '@angular/common';

import { RoutingModule } from "../routing/routing.module";


import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SidePanelComponent } from './bodering-view/side-panel/side-panel.component';
import { UtilizationHistoryComponent } from './center-view/utilization-history/utilization-history.component';
import { CurrentUtilizationComponent } from './center-view/current-utilization/current-utilization.component';
import { ResourceRequestComponent } from './center-view/resource-request/resource-request.component';
import { ReportComponent } from './center-view/report/report.component';
import { SearchComponent } from './center-view/search/search.component';
import { DepartmentComponent, EditDialog } from './center-view/department/department.component';
import { DesignationComponent } from './center-view/designation/designation.component';
import { ProjectUtilizationComponent } from './center-view/project-utilization/project-utilization.component';
import { BaseComponent } from './base/base.component';
import { MyProjectComponent } from './center-view/project/my-project/my-project.component';
import { ClientTrainerComponent } from './center-view/general_info/client-trainer/client-trainer.component';
import { TrainingProgramsComponent } from './center-view/training_program/training-programs/training-programs.component';
import { CommentsComponent } from './center-view/training_program/comments/comments.component';
import { NewProjectComponent } from './center-view/project/new-project/new-project.component';
import { ProfileComponent } from './center-view/profile/profile/profile.component';
import { SettingsComponent } from './center-view/profile/settings/settings.component';
import { MessagesComponent } from './center-view/messages/messages/messages.component';
import { PendingRequestComponent } from './center-view/project/pending-request/pending-request.component';
import { LocationComponent } from './center-view/general_info/location/location.component';
import { ProjectComponent, ProjectEditOrView } from './center-view/project/project/project.component';
import { EmployeeComponent, AddEmployee } from './center-view/general_info/employee/employee.component';
import { ApplyLeaveComponent } from './center-view/leave/apply-leave/apply-leave.component';
import { PendingLeavesComponent } from './center-view/leave/pending-leaves/pending-leaves.component';


@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    RoutingModule
  ],
  declarations: [
    BaseComponent,
    SignInComponent,
    SignUpComponent,
    SidePanelComponent,
    UtilizationHistoryComponent,
    CurrentUtilizationComponent,
    ResourceRequestComponent,
    PendingRequestComponent,
    ReportComponent,
    SearchComponent,
    DepartmentComponent, EditDialog,
    DesignationComponent,
    LocationComponent,
    ProjectComponent,
    ProjectUtilizationComponent,
    EmployeeComponent,
    AddEmployee,
    ProjectEditOrView,
    ApplyLeaveComponent,
    PendingLeavesComponent,
    MyProjectComponent,
    ClientTrainerComponent,
    TrainingProgramsComponent,
    CommentsComponent,
    NewProjectComponent,
    ProfileComponent,
    SettingsComponent,
    MessagesComponent
  ],
  exports: [
    BaseComponent,
    SignInComponent,
    SignUpComponent,
    SidePanelComponent,
    UtilizationHistoryComponent,
    CurrentUtilizationComponent,
    ResourceRequestComponent,
    PendingRequestComponent,
    ReportComponent,
    SearchComponent,
    DepartmentComponent, EditDialog,
    DesignationComponent,
    LocationComponent,
    ProjectComponent,
    ProjectUtilizationComponent,
    EmployeeComponent,AddEmployee,
    ProjectEditOrView
  ],
  entryComponents:[
    EditDialog,
    AddEmployee,
    ProjectEditOrView,
    NewProjectComponent,
    LocationComponent
  ]
})
export class ViewsModule { }
