import { Component, OnInit } from '@angular/core';
import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { Project, Employee } from '../../../../services/data-classes';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

  currentProject:Project;
  projectManager:Employee;
  resourceManager:Employee;
  description="testing";

  constructor(
    private middleServide:MiddleLayerService,
    private genEmployeeService:GeneralService<Employee>
  ) { }

  ngOnInit() {
    this.getCurrentProjectDetails();
  }

  getCurrentProjectDetails(){
    this.middleServide.getCurrentProject().subscribe(
      project => {
        this.currentProject = project;
        this.middleServide.getURLs().subscribe(
          URLs=>{
            var tempEmp = new Employee(project.projectManagerId,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
            this.genEmployeeService.post(URLs["employeeURL"],tempEmp).subscribe(
              pmEmp => this.projectManager = pmEmp
            );
          }
        );
      }
    );
  }

}
