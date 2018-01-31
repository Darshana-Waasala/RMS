import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'; // for the table
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; // for the popup

import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Employee } from '../../../services/data-classes';

import { GeneralService } from '../../../services/general.service';
import { JsonService } from '../../../services/json.service';
import { MiddleLayerService } from '../../../services/middle-layer.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // for the popup
  updatedValue: Employee;
  name: string;

  // for the table 
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  displayedColumns = ['picture', 'lastName', 'email', 'employeeLevel', 'experience', 'joinedDate', 'action']; // this array determine what to display
  dataSource: MatTableDataSource<Employee>;

  // for http requests
  employeeUrl: string;
  listOfEmployees:Array<Employee>; // for the table that hold list of employees

  constructor(
    private dialog: MatDialog,
    private genService: GeneralService<Employee>,
    private skillService: GeneralService<Array<string>>,
    private jsonService: JsonService,
    private mdLayerService: MiddleLayerService,
    private router: Router
  ) {
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.employeeUrl = response['employeeURL'];
      }
    )
  }

  public addOrEditEmp(employee?: Employee) {
    // this method will navigate to the required page
    if (employee !== null) {
      console.log('going to edit employee');
      this.mdLayerService.setEmployee(employee);
      this.router.navigate(['/base/location']);
    } else {
      console.log('going to add a new employee');
      this.router.navigate(['/base/location']);
    }
  }

  public deleteEmployee(id:number){
    // this will delete the employee

    this.genService.delete(this.employeeUrl,id).subscribe(); // remove from the database

    if(this.listOfEmployees !== null && this.listOfEmployees !== undefined){
      this.listOfEmployees = this.listOfEmployees.filter(emp => emp.id !== id);
    }

    // initialize table with new list
    this.dataSource = new MatTableDataSource<Employee>(this.listOfEmployees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * for the popup ///////////////////////////////////////////////////////////////////
   */
  openDialog(employee: Employee,flag:number): void {
    console.log(employee);
    if (flag === 0) { // opening to delete an employee
      let dialogRef = this.dialog.open(AddEmployee, {
        width: '350px',
        data: {
          flag:0,
          id:employee.id,
          address: employee.address,
          birthday: employee.birthday,
          bloodGroup: employee.bloodGroup,
          comments: employee.comments,
          contactNo: employee.contactNo,
          email: employee.email,
          employeeLevel: employee.employeeLevel,
          experience: employee.experience,
          firstName: employee.firstName,
          fullName: employee.fullName,
          gender: employee.gender,
          joinedDate: employee.joinedDate,
          lastName: employee.lastName,
          maritalStatus: employee.maritalStatus,
          nationality: employee.nationality,
          nic: employee.nic,
          pastProjects: employee.pastProjects,
          qualifications: employee.qualifications,
          religion: employee.religion,
          skills: employee.skills,
          trainingProgramsParticipated: employee.trainingProgramsParticipated,
          imagePath: employee.imagePath,
          visaDetails: {
            visaAvailablity: employee.visaDetails.visaAvailablity,
            attribute_1: employee.visaDetails.attribute_1,
            attribute_2: employee.visaDetails.attribute_2
          }, message: 'Are you sure you want to delete this employee?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('ordered to delete user!!!!');
        this.updatedValue = result;
        console.log(this.updatedValue);
        
        this.deleteEmployee(result.id)
        
      });

    } 
    else if(flag === 1) { // opening to view an employee
      let dialogRef = this.dialog.open(AddEmployee, {
        width: '350px',
        data: {
          flag:1,
          id:employee.id,
          address: employee.address,
          birthday: employee.birthday,
          bloodGroup: employee.bloodGroup,
          comments: employee.comments,
          contactNo: employee.contactNo,
          email: employee.email,
          employeeLevel: employee.employeeLevel,
          experience: employee.experience,
          firstName: employee.firstName,
          fullName: employee.fullName,
          gender: employee.gender,
          joinedDate: employee.joinedDate,
          lastName: employee.lastName,
          maritalStatus: employee.maritalStatus,
          nationality: employee.nationality,
          nic: employee.nic,
          pastProjects: employee.pastProjects,
          qualifications: employee.qualifications,
          religion: employee.religion,
          skills: employee.skills,
          trainingProgramsParticipated: employee.trainingProgramsParticipated,
          imagePath: employee.imagePath,
          visaDetails: {
            visaAvailablity: employee.visaDetails.visaAvailablity,
            attribute_1: employee.visaDetails.attribute_1,
            attribute_2: employee.visaDetails.attribute_2
          }, message: 'Are you sure you want to delete this employee?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
  }
  /////////////////////////////////////////////////////////////////// popup ends



  ngOnInit() {
    this.getEmployeeUrl();

  }

  getEmployeeUrl() {
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.employeeUrl = response['employeeURL'];
        this.initializeTable(response['employeeURL'])
      }
    )
  }

  // get employee data from the service and prepare the table
  initializeTable(url: string) {
    this.dataSource = null;
    this.genService.get(this.employeeUrl).subscribe(
      employees => {
        for (var i = 0; i < employees.length; i++) {
          var tempDate = new Date(employees[i].joinedDate);
          var dateString = tempDate.getFullYear() + "-" + tempDate.getMonth() + "-" + tempDate.getDate();
          employees[i].joinedDate = dateString;
        }
        this.listOfEmployees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.listOfEmployees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

    this.genService.getItemsInPage(this.employeeUrl, 'firstName', 'asc', 1).subscribe(

      employees => {
        console.log('in the function');
        console.log(employees);
      }
    );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    //  merge(this.sort.sortChange,this.paginator.page)
    //  .pipe(
    //    startWith({}),
    //    switchMap(()=>{
    //      this.isLoadingResults = true;

    //    })
    //  )
  }

  // filtering for the table
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

@Component({
  selector: 'add-employee',
  styles: [`
  img {
    border-radius: 30%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
}
  `],
  template:
    `<h1 mat-dialog-title>{{data.message}}</h1>
    <mat-dialog-content>

      <img src="{{data.imagePath}}"/>

      <div *ngIf="data.flag===0">
        <p>Full name: {{data.fullName}}</p> 
        <mat-divider></mat-divider>

        <p>email: {{data.email}}</p> 
        <mat-divider></mat-divider>

        <p>Contact Number: {{data.contactNo}}</p> 
        <mat-divider></mat-divider>

        <p>Employee level: {{data.employeeLevel}}</p> 
        <mat-divider></mat-divider> 

        <p>Experience: {{data.experience}}</p> 
        <mat-divider></mat-divider> 

        <p>Past projects number: {{data.pastProjects.length}}</p> 
        <mat-divider></mat-divider> 

        <p>Qualifications: </p> <span *ngFor="let skill of data.skills">{{skill}} - </span>
        <mat-divider></mat-divider> 
      </div>


      <div *ngIf="data.flag===1">
        
        <p>First Name: {{data.firstName}}</p> 
        <mat-divider></mat-divider> 
        <p>Last Name: {{data.lastName}}</p> 
        <mat-divider></mat-divider> 
        <p>Full Name: {{data.fullName}}</p> 
        <mat-divider></mat-divider> 
        <p>Address number: {{data.address}}</p> 
        <mat-divider></mat-divider> 
        <p>Contact Number: {{data.contactNo}}</p> 
        <mat-divider></mat-divider> 
        <p>Email: {{data.email}}</p> 
        <mat-divider></mat-divider> 
        <p>Employee Level: {{data.employeeLevel}}</p> 
        <mat-divider></mat-divider> 
        <p>Experience: {{data.experience}}</p> 
        <mat-divider></mat-divider> 
        <p>Date Joined: {{data.joinedDate}}</p> 
        <mat-divider></mat-divider> 
        

        <p>Birthday : {{data.birthday}}</p> 
        <mat-divider></mat-divider> 
        <p>Blood Group: {{data.bloodGroup}}</p> 
        <mat-divider></mat-divider> 
        <p>Comments: {{data.comments}}</p> 
        <mat-divider></mat-divider> 
        <p>Gender: {{data.gender}}</p> 
        <mat-divider></mat-divider> 
        <p>Marital Status: {{data.maritalStatus}}</p> 
        <mat-divider></mat-divider> 
        <p>Nationality: {{data.nationality}}</p> 
        <mat-divider></mat-divider> 
        <p>National Identity Card number: {{data.nic}}</p> 
        <mat-divider></mat-divider> 
        <p>Religion: {{data.religion}}</p> 
        <mat-divider></mat-divider> 
        <p>Past Projects: </p> <span *ngFor="let pastProject of data.pastProjects">{{pastProject}} - </span>
        <mat-divider></mat-divider> 
        <p>Qualifications: </p> <span *ngFor="let qualification of data.qualifications">{{qualification}} - </span>
        <mat-divider></mat-divider> 

      </div>
    </mat-dialog-content>

    <div mat-dialog-actions *ngIf="data.flag===0">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Delete</button>
    </div>
    <div mat-dialog-actions *ngIf="data.flag===1">
      <button mat-button (click)="onNoClick()">OK</button>
    </div>

  `,

})
export class AddEmployee {

  constructor(
    public dialogRef: MatDialogRef<AddEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

