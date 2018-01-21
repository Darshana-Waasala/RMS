import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../mat.module';
import { CommonModule } from '@angular/common';

import { RoutingModule } from "../routing/routing.module";


import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SidePanelComponent } from './bodering-view/side-panel/side-panel.component';
import { TopBarComponent } from './bodering-view/top-bar/top-bar.component';
import { UtilizationHistoryComponent } from './center-view/utilization-history/utilization-history.component';
import { CurrentUtilizationComponent } from './center-view/current-utilization/current-utilization.component';
import { ResourceRequestComponent } from './center-view/resource-request/resource-request.component';
import { PendingRequestComponent } from './center-view/pending-request/pending-request.component';
import { ReportComponent } from './center-view/report/report.component';
import { SearchComponent } from './center-view/search/search.component';
import { DepartmentComponent, EditDialog } from './center-view/department/department.component';
import { DesignationComponent } from './center-view/designation/designation.component';
import { ExpertiseComponent } from './center-view/expertise/expertise.component';
import { LocationComponent } from './center-view/location/location.component';
import { ProjectComponent } from './center-view/project/project.component';
import { ResourcesComponent } from './center-view/resources/resources.component';
import { ProjectRoleComponent } from './center-view/project-role/project-role.component';
import { SkillsComponent } from './center-view/skills/skills.component';
import { ProjectUtilizationComponent } from './center-view/project-utilization/project-utilization.component';
import { BaseComponent } from './base/base.component';


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
    TopBarComponent,
    UtilizationHistoryComponent,
    CurrentUtilizationComponent,
    ResourceRequestComponent,
    PendingRequestComponent,
    ReportComponent,
    SearchComponent,
    DepartmentComponent, EditDialog,
    DesignationComponent,
    ExpertiseComponent,
    LocationComponent,
    ProjectComponent,
    ResourcesComponent,
    ProjectRoleComponent,
    SkillsComponent,
    ProjectUtilizationComponent,
  ],
  exports: [
    BaseComponent,
    SignInComponent,
    SignUpComponent,
    SidePanelComponent,
    TopBarComponent,
    UtilizationHistoryComponent,
    CurrentUtilizationComponent,
    ResourceRequestComponent,
    PendingRequestComponent,
    ReportComponent,
    SearchComponent,
    DepartmentComponent, EditDialog,
    DesignationComponent,
    ExpertiseComponent,
    LocationComponent,
    ProjectComponent,
    ResourcesComponent,
    ProjectRoleComponent,
    SkillsComponent,
    ProjectUtilizationComponent,
  ],
  entryComponents:[
    EditDialog,
  ]
})
export class ViewsModule { }
