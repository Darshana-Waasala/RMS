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
  ) {
    this.mockData();
   }

  ngOnInit() {
    this.forcussedItem = null;
    this.getPendingLeaves();
  }

  allocate(requestId:number){
    var removeIndex = this.allRequests.map(function(item){return item.id;}).indexOf(requestId);
    this.allRequests.splice(removeIndex,1);
  }

  deny(requestId:number){
    var removeIndex = this.allRequests.map(function(item){return item.id;}).indexOf(requestId);
    this.allRequests.splice(removeIndex,1);
  }

  mockData(){
    this.allRequests = new Array<ResourceRequests>();
    this.allRequests[0] = new ResourceRequests(1,'first name',2,'exceline','02/02/2018','02/02/2018',4,false,null,null,null,null);
    this.allRequests[1] = new ResourceRequests(2,'first name 2',2,'exceline','02/02/2018','02/02/2018',4,false,null,null,null,null);
    
    this.tempAvailableEmps = [
      {
        "id": 0,password:"dfe",
        "leavesTaken": null,
        "contactNo": "0765069566",
        "pastProjects": [
          104,
          34,
          96,
          101,
          40,
          86,
          0,
          29,
          50,
          37
        ],
        "address": "address_0",
        "bloodGroup": "O+",
        "joinedDate": "02/11/2003",
        "birthday": "04/04/1982",
        "nationality": "sri lankan",
        "qualifications": [
          "qualification_2",
          "qualification_10",
          "qualification_12",
          "qualification_4"
        ],
        "experience": "6 years",
        "fullName": "fullName_0",
        "gender": "female",
        "religion": "religion",
        "maritalStatus": "married",
        "firstName": "firstName_0",
        "imagePath": "../../../../assets/image/25.png",
        "lastName": "lastName_0",
        "trainingProgramsParticipated": [
          12,
          9,
          17,
          34,
          43,
          49,
          29,
          16,
          27,
          32,
          22,
          1,
          19,
          23,
          40,
          4,
          47,
          6
        ],
        "visaDetails": {
          "visaAvailablity": false,
          "attribute_1": "None",
          "attribute_2": "None"
        },
        "comments": "comment_268 ",
        "nic": "983973574v",
        "skills": [
          "express",
          "reactjs",
          "native-script",
          "mongodb",
          "backbone-js",
          "css",
          "nodejs",
          "scss"
        ],
        "currentProject": 89,
        "email": "email@0",
        "employeeLevelId": 11
      },
      {
        "id": 1,password:'dfe',
        "leavesTaken": null,
        "contactNo": "0773685569",
        "pastProjects": [
          25,
          74,
          43,
          23,
          79,
          55,
          5
        ],
        "address": "address_1",
        "bloodGroup": "B+",
        "joinedDate": "08/28/2003",
        "birthday": "01/18/1990",
        "nationality": "sri lankan",
        "qualifications": [
          "qualification_4",
          "qualification_12"
        ],
        "experience": "7 years",
        "fullName": "fullName_1",
        "gender": "female",
        "religion": "religion",
        "maritalStatus": "single",
        "firstName": "firstName_1",
        "imagePath": "../../../../assets/image/9.png",
        "lastName": "lastName_1",
        "trainingProgramsParticipated": [
          42,
          21,
          31,
          11,
          32,
          1,
          49,
          19
        ],
        "visaDetails": {
          "visaAvailablity": false,
          "attribute_1": "None",
          "attribute_2": "None"
        },
        "comments": "comment_442 ",
        "nic": "902896610v",
        "skills": [
          "java",
          "nodejs",
          "sql"
        ],
        "currentProject": 62,
        "email": "email@1",
        "employeeLevelId": 12
      },
      {
        "id": 2,password:'dfer',
        "leavesTaken": null,
        "contactNo": "0765853111",
        "pastProjects": [
          15,
          25,
          50,
          97,
          35,
          107,
          41,
          86
        ],
        "address": "address_2",
        "bloodGroup": "O-",
        "joinedDate": "06/18/2002",
        "birthday": "11/17/1991",
        "nationality": "sri lankan",
        "qualifications": [
          "qualification_9",
          "qualification_11",
          "qualification_6",
          "qualification_3",
          "qualification_2",
          "qualification_12"
        ],
        "experience": "8 years",
        "fullName": "fullName_2",
        "gender": "female",
        "religion": "religion",
        "maritalStatus": "single",
        "firstName": "firstName_2",
        "imagePath": "../../../../assets/image/5.png",
        "lastName": "lastName_2",
        "trainingProgramsParticipated": [
          22,
          46,
          24,
          28,
          3,
          14,
          33,
          23,
          45,
          16,
          39,
          20,
          13,
          6,
          34,
          38
        ],
        "visaDetails": {
          "visaAvailablity": true,
          "attribute_1": "attribute one",
          "attribute_2": "attribute two"
        },
        "comments": "comment_449 ",
        "nic": "841584084v",
        "skills": [
          "spark",
          "backbone-js",
          "opencv",
          "scss",
          "docker",
          "angular",
          "unix",
          "java"
        ],
        "currentProject": 57,
        "email": "email@2",
        "employeeLevelId": 10
      },
      {
        "id": 3,password:'dfe',
        "leavesTaken": null,
        "contactNo": "0763507994",
        "pastProjects": [
          30,
          69
        ],
        "address": "address_3",
        "bloodGroup": "B+",
        "joinedDate": "02/29/2004",
        "birthday": "02/01/1981",
        "nationality": "sri lankan",
        "qualifications": [
          "qualification_10"
        ],
        "experience": "6 years",
        "fullName": "fullName_3",
        "gender": "male",
        "religion": "religion",
        "maritalStatus": "single",
        "firstName": "firstName_3",
        "imagePath": "../../../../assets/image/28.png",
        "lastName": "lastName_3",
        "trainingProgramsParticipated": [
          12,
          35,
          41
        ],
        "visaDetails": {
          "visaAvailablity": false,
          "attribute_1": "None",
          "attribute_2": "None"
        },
        "comments": "comment_196 ",
        "nic": "815281446v",
        "skills": [
          "java",
          "javascript",
          "nodejs",
          "css",
          "scss",
          "angular",
          "express",
          "sql",
          "mongodb",
          "spark",
          "python",
          "opencv",
          "native-script",
          "reactjs",
          "backbone-js",
          "docker",
          "unix"
        ],
        "currentProject": 21,
        "email": "email@3",
        "employeeLevelId": 6
      }
    ];
    console.log(this.tempAvailableEmps);
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
