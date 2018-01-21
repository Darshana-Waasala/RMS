import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../views/authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../views/authentication/sign-up/sign-up.component';
import { CurrentUtilizationComponent } from '../views/center-view/current-utilization/current-utilization.component';
import { DepartmentComponent } from '../views/center-view/department/department.component';
import { DesignationComponent } from '../views/center-view/designation/designation.component';
import { ExpertiseComponent } from '../views/center-view/expertise/expertise.component';
import { LocationComponent } from '../views/center-view/location/location.component';
import { BaseComponent } from "../views/base/base.component";
import { SidePanelComponent } from '../views/bodering-view/side-panel/side-panel.component';
import { PendingRequestComponent } from '../views/center-view/pending-request/pending-request.component';
import { ProjectComponent } from '../views/center-view/project/project.component';
import { ProjectRoleComponent } from '../views/center-view/project-role/project-role.component';
import { ProjectUtilizationComponent } from '../views/center-view/project-utilization/project-utilization.component';
import { ReportComponent } from '../views/center-view/report/report.component';
import { ResourceRequestComponent } from '../views/center-view/resource-request/resource-request.component';
import { ResourcesComponent } from '../views/center-view/resources/resources.component';
import { SearchComponent } from '../views/center-view/search/search.component';
import { SkillsComponent } from '../views/center-view/skills/skills.component';
import { UtilizationHistoryComponent } from '../views/center-view/utilization-history/utilization-history.component';

const routes: Routes = [

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // { path: 'base', component:BaseComponent, children:[ //
  {
    path: 'base', component: SidePanelComponent, children: [
      { path: 'current-utilization', component: CurrentUtilizationComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'expertise', component: ExpertiseComponent },
      { path: 'location', component: LocationComponent },
      { path: 'pending-request', component: PendingRequestComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project-role', component: ProjectRoleComponent },
      { path: 'project-utilization', component: ProjectUtilizationComponent },
      { path: 'report', component: ReportComponent },
      { path: 'resource-request', component: ResourceRequestComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'search', component: SearchComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'utilization-history', component: UtilizationHistoryComponent },
    ]
  },

  { path: '', redirectTo: '/base/search', pathMatch: 'full' },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
