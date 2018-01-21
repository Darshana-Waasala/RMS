import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'; // for the table
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'; // for the popup


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  // for the table
  displayedColumns = ['project', 'resource', 'name', 'color']; // this array determine what to display
  dataSource: MatTableDataSource<DepartmentData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // for the popup
  updatedValue: DepartmentData;
  name: string;

  constructor(public dialog: MatDialog) {
        // Create 100 users
        const users: DepartmentData[] = [];
        for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
  }

  /**
   * for the popup
   */
  openDialog(row?:DepartmentData): void {
    console.log(row);
    if(row !== undefined){ // opening to update a department
      let dialogRef = this.dialog.open(EditDialog, {
        width: '350px',
        data: { name:row.name, project:row.project,resource:row.resource,message:'make your changes'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.updatedValue = result;
        console.log(this.updatedValue);
      });

    }else{ // opening to create a department
    let dialogRef = this.dialog.open(EditDialog, {
      width: '350px',
      data: { name:'', project:'',resource:'',message:'add new department details'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
    }
  }

  ngOnInit() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
/** Builds and returns a new User. */
function createNewUser(projectId: number): DepartmentData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    project: projectId.toString(),
    name: name,
    resource: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface DepartmentData {
  project: string; // id
  resource: string; // name
  name: string; // progress
  color: string;
}

@Component({
  selector: 'edit-dialog',
  template: 
  `<h1 mat-dialog-title>Hi {{data.name}}</h1>
  <div mat-dialog-content>
    <p>{{data.message}}</p>
    <mat-form-field>
     <input matInput placeholder="name" tabindex="1" [(ngModel)]="data.name">
    </mat-form-field>
    <mat-form-field>
     <input matInput placeholder="project" tabindex="1" [(ngModel)]="data.project">
    </mat-form-field>
    <mat-form-field>
     <input matInput placeholder="resource" tabindex="1" [(ngModel)]="data.resource">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
  </div>`,
})
export class EditDialog {

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
