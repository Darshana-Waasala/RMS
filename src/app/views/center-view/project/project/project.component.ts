import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, 
  MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GeneralService } from '../../../../services/general.service';
import { JsonService } from '../../../../services/json.service';

import { Project } from '../../../../services/data-classes';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MiddleLayerService } from '../../../../services/middle-layer.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /** variables for the tables /////////////////////////////////////////////// */
  displayedColumns = ['projectName', 'projectManager', 'totalExpences', 'deadLine', 'customer', 'projectCatogary', 'action'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ///////////////////////////////////////////////

  projectURL: string;
  currentProjects: Array<Project>;
  pastProjects: Array<Project>;
  pendingProjects: Array<Project>;
  title: string;

  constructor(
    private projectService: GeneralService<Project>,
    private middleLayerService:MiddleLayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProjectURL();
  }

  /**
 * Set the paginator and sort after the view init since this component will
 * be able to query its view for the initialized paginator and sort.
 */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  /**apply the filter function in the table */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getProjectURL() {
    this.middleLayerService.getURLs().subscribe(
      (response:Response) => {
        this.projectURL = response['projectURL'];
        this.getProjects(response['projectURL']);
      }
    )
  }

  public getProjects(url: string) {

    var temProject = new Project(null,null,null,null,null,null,null,null,null,null,null,null,null,null,1);

    /**attrubute 'projectSituation' 1 for current projects */
    this.projectService.postForArray(url,temProject).subscribe(
      projList => {
        this.currentProjects = projList;

        // Assign the data to the data source for the table to render
        /**initially the tables are filled with current projects */
        this.dataSource = new MatTableDataSource(projList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

  }

  public getCurrentProjects() {
    // Assign the data to the data source for the table to render
    /**initially the tables are filled with current projects */
    this.dataSource = new MatTableDataSource(this.currentProjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getPastProjects() {

    var temProject = new Project(null,null,null,null,null,null,null,null,null,null,null,null,null,null,2);
    /**attrubute 'projectSituation' 2 for past projects */
    this.projectService.postForArray(this.projectURL, temProject).subscribe(
      projList => {
        this.pastProjects = projList;
      }
    );

    // Assign the data to the data source for the table to render
    /**initially the tables are filled with current projects */
    this.dataSource = new MatTableDataSource(this.pastProjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getPendingProjects() {


    var temProject = new Project(null,null,null,null,null,null,null,null,null,null,null,null,null,null,0);
    /**attrubute 'projectSituation' 0 for pending projects */
    this.projectService.postForArray(this.projectURL, temProject).subscribe(
      projList => {
        this.pendingProjects = projList;
      }
    );

    // Assign the data to the data source for the table to render
    /**initially the tables are filled with current projects */
    this.dataSource = new MatTableDataSource(this.pendingProjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public editProj(project:Project){
    let dialogRef = this.dialog.open(NewProjectComponent,{
      width:'80%',
      data:{
        budjet:project.budjet,
        comments:project.comments,
        customer:project.customer,
        deadLine:project.deadLine,
        developmentMethodalogy:project.developmentMethodalogy,
        expectedIncome:project.expectedIncome,
        id:project.id,
        projectCatogary:project.projectCatogary,
        projectManagerId:project.projectManagerId,
        projectName:project.projectName,
        projectSituation:project.projectSituation,
        projectTeam:project.projectTeam,
        toEdit:true
      }
    });

    dialogRef.afterClosed().subscribe(editedProject =>{
      // this.middleLayerService.getURLs().subscribe(
      //   URLs=>{
      //     this.projectService.post(URLs['editedOrNewProjectURL'],editedProject).subscribe(
      //       result=>{
      //         console.log("got post OK",result);
      //       }
      //     );
      //   }
      // );
    });
  }

  public openDialog(){
    let dialogRef = this.dialog.open(ProjectEditOrView, {
      width: '250px',
      data: { name: "testing name", animal: "testing animal" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('the result',result);
    });
  }

  public newProjectDialog(){
    let dialogRef = this.dialog.open(NewProjectComponent,{
      width:'80%',
      data:{
        toEdit:false
      }
    });

    dialogRef.afterClosed().subscribe(newProject =>{
      // this.middleLayerService.getURLs().subscribe(
      //   URLs=>{
      //     this.projectService.post(URLs['editedOrNewProjectURL'],newProject).subscribe(
      //       result=>{
      //         console.log("got post OK",result);
      //       }
      //     );
      //   }
      // );
    });
  }

}

@Component({
  selector: 'project-overview',
  template:`
    <h1 mat-dialog-title>Hi {{data.name}}</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.animal">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div>
  `,
})
export class ProjectEditOrView {

  constructor(
    public dialogRef: MatDialogRef<ProjectEditOrView>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
