import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../views/authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../views/authentication/sign-up/sign-up.component';
import { CurrentUtilizationComponent } from '../views/center-view/current-utilization/current-utilization.component';
import { DepartmentComponent } from '../views/center-view/department/department.component';
import { DesignationComponent } from '../views/center-view/designation/designation.component';
import { BaseComponent } from "../views/base/base.component";
import { SidePanelComponent } from '../views/bodering-view/side-panel/side-panel.component';
import { ProjectUtilizationComponent } from '../views/center-view/project-utilization/project-utilization.component';
import { ReportComponent } from '../views/center-view/report/report.component';
import { ResourceRequestComponent } from '../views/center-view/resource-request/resource-request.component';
import { UtilizationHistoryComponent } from '../views/center-view/utilization-history/utilization-history.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { LocationComponent } from '../views/center-view/general_info/location/location.component';
import { PendingRequestComponent } from '../views/center-view/project/pending-request/pending-request.component';
import { ProjectComponent } from '../views/center-view/project/project/project.component';
import { SearchComponent } from '../views/center-view/search/search.component';
import { EmployeeComponent } from '../views/center-view/general_info/employee/employee.component';
import { ApplyLeaveComponent } from '../views/center-view/leave/apply-leave/apply-leave.component';
import { PendingLeavesComponent } from '../views/center-view/leave/pending-leaves/pending-leaves.component';
import { MyProjectComponent } from '../views/center-view/project/my-project/my-project.component';
import { ClientTrainerComponent } from '../views/center-view/general_info/client-trainer/client-trainer.component';
import { TrainingProgramsComponent } from '../views/center-view/training_program/training-programs/training-programs.component';
import { CommentsComponent } from '../views/center-view/training_program/comments/comments.component';
import { MessagesComponent } from '../views/center-view/messages/messages/messages.component';
import { ProfileComponent } from '../views/center-view/profile/profile/profile.component';
import { SettingsComponent } from '../views/center-view/profile/settings/settings.component';

const routes: Routes = [

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // { path: 'base', component:BaseComponent, children:[ //
  {
    path: 'base', 
    component: SidePanelComponent,
    canActivate:[AuthGuardService],
    canActivateChild:[AuthGuardService], 
    children: [
      { path: 'project', component: ProjectComponent },
      { path: 'my-project', component:MyProjectComponent},
      { path: 'pending-request', component: PendingRequestComponent },

      { path: 'employee', component:EmployeeComponent},
      { path: 'client-trainer',component:ClientTrainerComponent},

      { path: 'training-program', component:TrainingProgramsComponent},
      { path: 'comments', component:CommentsComponent},

      { path: 'apply-leave', component: ApplyLeaveComponent},
      { path: 'pending-leave', component:PendingLeavesComponent},

      { path: 'messages', component:MessagesComponent},

      { path: 'profile', component:ProfileComponent},
      { path: 'settings', component:SettingsComponent},

      { path: 'utilization-history', component: UtilizationHistoryComponent },
      { path: 'current-utilization', component: CurrentUtilizationComponent },
      { path: 'resource-request', component: ResourceRequestComponent },
      { path: 'project-utilization', component: ProjectUtilizationComponent },
      { path: 'search', component: SearchComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'report', component: ReportComponent },
      { path: 'designation', component: DesignationComponent },
    ]
  },

  { path: '', redirectTo: '/base/employee', pathMatch: 'full' },

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
