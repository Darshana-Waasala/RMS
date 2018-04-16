import { Injectable, OnInit } from '@angular/core';
import { Employee, EmployeeLevelDetails, LeaveDetails, Project, Leaves, TermParams } from './data-classes';
import { GeneralService } from './general.service';
import { JsonService } from './json.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from'
import { Router } from '@angular/router';

@Injectable()
export class MiddleLayerService implements OnInit{

  /**
   * these variables hold the values that are fetched
   */
  private tempItem;
  private currentEmployee: Employee;
  private currentProject:Project;
  private empLevelDetails:EmployeeLevelDetails[];
  private URLs:object;
  private leaveDetails:LeaveDetails[];

  constructor(
    private genLeaveService:GeneralService<Leaves>,
    private genProjectService:GeneralService<Project>,
    private genLeaveDetailService:GeneralService<LeaveDetails>,
    private genEmpLevelDetailsService:GeneralService<EmployeeLevelDetails>,
    private genEmpService:GeneralService<Employee>,
    private jsonService:JsonService,
    private router:Router
  ) { }

  ngOnInit(){
    console.log("in the service : one");

    this.jsonService.getURL().subscribe(
      URLs=>this.URLs
    );
  }

  ///////////////////// ANY ITEM /////////////////////////////////////////////////////
  public setItem(item: any): void {
    this.tempItem = item;
  }
  public getItem(): any {
    return this.tempItem;
  }
  public resetItem(): void {
    this.tempItem = null;
  }

  ///////////////////// CURRENT EMPLOYEE /////////////////////////////////////////////////////
  /**
   * current employee need to be set at the login
   * for temp-dev purposes we may set tep employyes
   * @param employee is used to get the employee
   */
  public setCurrentEmployee(employee: Employee): void {
    this.currentEmployee = employee;
  }
  public getCurrentEmployee(): Observable<Employee> {
    if (this.currentEmployee !== null && this.currentEmployee !== undefined){
      return of(this.currentEmployee);
    }else {
      /**
       * this else part should be only for developing purposes
       */
      return this.jsonService.getURL().switchMap(
        urls => {
          return this.genEmpService.getById(urls["employeeURL"],Math.floor(Math.random()*100)).switchMap(
            data=> {
              this.currentEmployee = data;
              return of(data);
            }
          );
        }
      );
    }
  }
  public resetCurrentEmployee(): void {
    this.currentEmployee = null;
  }

    ///////////////////// URLs /////////////////////////////////////////////////////
    public setURLs(Urls:object):void{
      this.URLs = Urls;
    }
    public getURLs():Observable<object>{
      if(this.URLs !== null && this.URLs !== undefined){
        return of(this.URLs);
      }
      else{
        return this.jsonService.getURL().switchMap(
          (response:Response)=>{
            this.URLs = response;
            return of(response);
          }
        )
      }
    }
    public resetURLs():void{
      this.URLs = null;
    }
  

  ///////////////////// Level Details /////////////////////////////////////////////////////
  public setLevelDetails(levelDetails: EmployeeLevelDetails[]):void{
    this.empLevelDetails = levelDetails;
  }
  public getLevelDetails():Observable<EmployeeLevelDetails[]>{
    if (this.empLevelDetails === undefined || this.empLevelDetails === null){
      if (this.URLs === undefined || this.URLs === null){
        return this.jsonService.getURL().switchMap(
          urls =>{
            this.URLs = urls;
            return this.genEmpLevelDetailsService.get(urls["employeeLevelDetailsURL"]).switchMap(
              result=>{
                this.empLevelDetails = result;
                return of(result);
              }
            );
          }
        )
      }else{
        return this.genEmpLevelDetailsService.get(this.URLs["employeeLevelDetailsURL"]);
      }
    }else{
      return of(this.empLevelDetails);
    }
     
  }
  public resetLevelDetails():void{
    this.empLevelDetails = null;
  }

  ///////////////////// Leave Details /////////////////////////////////////////////////////
  public setLeaveDetails(leaveDetails:LeaveDetails[]){
    this.leaveDetails = leaveDetails;
  }
  public getLeaveDetails():Observable<LeaveDetails[]>{
    if(this.leaveDetails !== undefined && this.leaveDetails !== null){
      return of(this.leaveDetails);
    }else {
      if(this.URLs !== undefined && this.URLs !== null ){
        return this.genLeaveDetailService.get(this.URLs["leaveDetailsURL"]).switchMap(
          leaveDetails =>{
            this.leaveDetails = leaveDetails;
            return of(leaveDetails);
          }
        )
      }else{
        return this.jsonService.getURL().switchMap(
          urls=>{
            this.URLs = urls;
            return this.genLeaveDetailService.get(urls["leaveDetailsURL"]).switchMap(
              leaveDetls =>{
                this.leaveDetails = leaveDetls;
                return of(leaveDetls);
              }
            )
          }
        )
      }
    }
  }
  public resetLeaveDetails():void{
    this.leaveDetails = null;
  }

  ///////////////////// Get Corrosponding PM and RM /////////////////////////////////////////////////////
  public getCurrentPMandRM():Observable<{"CurrentEmp":Employee,"PMId":number,"RMId":number}>{
    if(this.URLs !== null && this.URLs !== undefined){
      if(this.currentEmployee !==null && this.currentEmployee !== undefined){
        return this.genProjectService.getItemsWithExactAttribute(this.URLs["projectURL"],'id',this.currentEmployee.id.toString()).switchMap(
          project=>{
            return of({"CurrentEmp":this.currentEmployee,"PMId":project[0].projectManagerId,"RMId":project[0].resourceManagerId})
          }
        )
      }
      else{
        this.router.navigate(['/sign-in']);
      }
    }
    else{
      this.getURLs().subscribe(
        data=>{
          this.URLs = data;
          this.getCurrentPMandRM();
        }
      );
    }
  }

  ///////////////////// Get pending leaves depending on the logged in person /////////////////////////////////////////////////////
  /** 
   * get leaves regardless of PM/RM approval
   * this should not include the leaves that have start day lesser than today
   */
  public getAllPendingLeavesForAdmin(tempCurrentEmp:Employee):Observable<Leaves[]>{
    const queryItems = new TermParams("adminAproval","false");
    var termParaArray = [];
    termParaArray.push(queryItems);
    console.log("query term array : ", termParaArray);
    
    if(this.URLs !== null && this.URLs !== undefined){
      console.log("we have urls")
      if(this.currentEmployee !== null && this.currentEmployee !== undefined ){
        console.log("we have current employee")
        return this.genLeaveService.getItemsWithMultipleQueries(this.URLs['allLeavesURL'],termParaArray);
      }
      else{
        console.log("no current employee")
        return of(null);
      }
    }
    else{
      console.log("no urls")
      return this.jsonService.getURL().switchMap(
        urls => {
          this.URLs = urls;
          console.log("go the urls");
          return this.genLeaveService.getItemsWithMultipleQueries(urls['allLeavesURL'],termParaArray).switchMap(
            leaves =>{
              return of(leaves);
            }
          );
        }
      )
    }
  }

  /**
   * get leaves that have been approved by anybody
   * @param currentEmp should be of admin grade
   */
  public getAllPastApprovedLeavesForAdmin(currentEmp:Employee):Observable<Leaves[]>{
    return of(null);
  }

  /**
   * get leaves that have been denied by someone and not been taken
   * @param currentEmp should be of admin level
   */
  public getAllPastDeniedLeavesForAdmin(currentEmp:Employee):Observable<Leaves[]>{
    return of(null);
  }

  /**
   * Get the leves that are 
   * >> (approvedByPM == false && deniedByPM == false && PMID === currentEmp.id && leaveStartDate > today) <<
   * @param currentEmp should be an employee of PM level
   */
  public getAllPendingLeavesForPM(currentEmp:Employee):Observable<Leaves[]>{
    return of(null);
  }

  /**
   * >> (approvedByPM == true && PMID === currentEmp.id && leaveStartDate < today) <<
   * @param currentEmp should be of PM level
   */
  public getAllApprovedLeavesByPM(currentEmp:Employee):Observable<Leaves[]>{
    return of(null);
  }

  /**
   * >> (approvedByRM == false && deniedByRM == false && RMID === currentEmp.id && leaveStartDate > today) <<
   * @param currentEmp should be of resource manager level
   */
  public getAllPendingLeavesForRM(currentEmp:Employee):Observable<Leaves[]>{
    return of(null);
  }

  /**
   * 
   * @param currentEmp 
   */
  public getAllApprovedLeavesForRM(currentEmp:Employee):Observable<Leaves[]>{
    return of (null);
  }


  ///////////////////// testing /////////////////////////////////////////////////////
  public testing():Observable<EmployeeLevelDetails[]>{
    if (this.URLs === undefined || this.URLs === null){
      return this.jsonService.getURL().switchMap(
        urls =>{
          this.URLs = urls;
          return this.genEmpLevelDetailsService.get(urls["employeeLevelDetailsURL"]).switchMap(
            result=>{
              this.empLevelDetails = result;
              return of(result);
            }
          );
        }
      )
    }else{
      return this.genEmpLevelDetailsService.get(this.URLs["employeeLevelDetailsURL"]);
    } 
  }

}
