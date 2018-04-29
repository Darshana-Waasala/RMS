import { Component, OnInit, Inject } from '@angular/core';
import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { Project, Employee, ProjectEvent } from '../../../../services/data-classes';
import { GeneralService } from '../../../../services/general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

  currentProject: Project;
  projectManager: Employee;
  resourceManager: Employee;
  description = "testing";
  // projectEvents:Array<ProjectEvent>;
  projectEvents = ['orange','mango','apple','avacado','papaya','banana','guawa'];

  constructor(
    private middleServide: MiddleLayerService,
    private genEmployeeService: GeneralService<Employee>,
    private genProjEventService:GeneralService<ProjectEvent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getCurrentProjectDetails();
  }
  testing(){
    console.log('hi !!!');
  }

  newEventDialog(){
    console.log('opening dialog');
    let dialogRef = this.dialog.open(NewEventDialog, {
      width: '80%',
      data: {flag:'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getCurrentProjectDetails() {
    this.middleServide.getCurrentProject().subscribe(
      project => {
        this.currentProject = project;
        this.middleServide.getURLs().subscribe(
          URLs => {
            var tempEmp = new Employee(project.projectManagerId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
            /**
             * implement the comment for deployment
             * and remove the >> getById << subscription funciton below
             */
            // this.genEmployeeService.post(URLs["employeeURL"],tempEmp).subscribe(
            this.genEmployeeService.getById(URLs["employeeURL"], project.resourceManagerId).subscribe(
              pmEmp => {
                this.projectManager = pmEmp;
              }
            );
            tempEmp = new Employee(project.resourceManagerId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
            /**
             * implement the comment for deployment
             * and remove the >> getById << subscription funciton below
             */
            // this.genEmployeeService.post(URLs["employeeURL"],tempEmp).subscribe(
            this.genEmployeeService.getById(URLs["employeeURL"], project.resourceManagerId).subscribe(
              resourceMan => this.resourceManager = resourceMan
            )
          }
        );
      }
    );
  }

  // getProjectEvents(){
  //   this.middleServide.getURLs().subscribe(
  //     URLs=>{
  //       this.genProjEventService.get(URLs["projectEventURL"]).subscribe(
  //         projEvents=>{
  //           this.projectEvents = projEvents;
  //         }
  //       );
  //     }
  //   );
  // }

}

@Component({
  selector:'new-event-dialog',
  template:`
  <h1 mat-dialog-title>Hi {{data.name}}</h1>
  <div mat-dialog-content>
    <p>What's your favorite animal?</p>
    <mat-form-field>
      <input matInput tabindex="1" [(ngModel)]="data.animal">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
  </div>
  `
})

export class NewEventDialog {

  constructor(
    public dialogRef: MatDialogRef<NewEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
