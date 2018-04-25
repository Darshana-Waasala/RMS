import { Component, OnInit } from '@angular/core';
import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { Employee, ResourceRequests, TermParams } from '../../../../services/data-classes';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {

  currentEmployee:Employee;
  allRequests:Array<ResourceRequests>;
  tempAvailableEmps:Array<Employee>;
  private forcussedItem:number;

  constructor(
    private middleService:MiddleLayerService,
    private genPendingLeavesService:GeneralService<ResourceRequests>,
    private genEmployeeService:GeneralService<Employee>,
  ) { }

  ngOnInit() {
    this.forcussedItem = null;
    this.getPendingLeaves();
  }

  getPendingLeaves(){
    // this.middleService.getCurrentEmployee().subscribe(
    //   employee=> {
    //     if(employee.employeeLevelId === 1){ // adminstrator
    //       this.middleService.getURLs().subscribe(
    //         URLs=>{
    //           this.genPendingLeavesService.getItemsWithExactAttribute(URLs["pendingResourceURL"],"allocated","false").subscribe(
    //             allRequestsPending => {this.allRequests = allRequestsPending;}
    //           );
    //         }
    //       );
    //     }else if(employee.employeeLevelId === 2){ // perticular resource manager
    //       this.middleService.getURLs().subscribe(
    //         URLs=>{
    //           var queryBy = new Array<TermParams>();
    //           queryBy[0] = new TermParams("allocated","false");
    //           queryBy[1] = new TermParams("rmId",employee.id.toString());
    //           this.genPendingLeavesService.getItemsWithMultipleQueries(URLs["pendingResourceURL"],queryBy).subscribe(
    //             requestsPendingForThisRM => {this.allRequests = requestsPendingForThisRM;}
    //           );
    //         }
    //       );
    //     }else {
    //       console.log(">>>>DO NOT SHOW THE VIEW<<<<<<<");
    //     }
    //   }
    // );
  }

  getAvailableResources(resourceLevelRequired:number,requestId:number){
    // this.middleService.getURLs().subscribe(
    //   URLs=>{
    //     var queryBy = new Array<TermParams>();
    //     queryBy[0] = new TermParams("employeeLevelId",resourceLevelRequired.toString());
    //     queryBy[1] = new TermParams("currentProject","Null");
    //     this.genEmployeeService.getItemsWithMultipleQueries(URLs["employeeURL"],queryBy).subscribe(
    //       nonAllocatedEmps => {
    //         this.tempAvailableEmps = nonAllocatedEmps;
    //         this.forcussedItem = requestId;
    //       }
    //     );
    //   }
    // );
  }

}
