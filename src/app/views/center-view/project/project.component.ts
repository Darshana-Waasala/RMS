import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { GeneralService } from '../../../services/general.service';
import { JsonService } from '../../../services/json.service';

import { Project } from '../../../services/data-classes';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /** variables for the tables /////////////////////////////////////////////// */
  displayedColumns = ['projectName', 'projectManager', 'totalExpences', 'deadLine','customer','projectCatogary','action'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ///////////////////////////////////////////////

  projectURL: string;
  currentProjects: Array<Project>;
  pastProjects: Array<Project>;
  pendingProjects: Array<Project>;

  constructor(
    private projectService: GeneralService<Project>,
    private jsonService: JsonService
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
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.projectURL = response['projectURL'];
        this.getProjects(response['projectURL']);
      }
    )
  }

  public getProjects(url: string) {

    /**attrubute 'projectSituation' 1 for current projects */
    this.projectService.getItemsWithExactAttribute(url, 'projectSituation', 1).subscribe(
      projList => {
        this.currentProjects = projList;

        // Assign the data to the data source for the table to render
        /**initially the tables are filled with current projects */
        this.dataSource = new MatTableDataSource(projList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

    /**attrubute 'projectSituation' 2 for past projects */
    this.projectService.getItemsWithExactAttribute(url, 'projectSituation', 2).subscribe(
      projList => {
        this.pastProjects = projList;
      }
    );

    /**attrubute 'projectSituation' 0 for pending projects */
    this.projectService.getItemsWithExactAttribute(url, 'projectSituation', 0).subscribe(
      projList => {
        this.pendingProjects = projList;
      }
    );
  }

}
