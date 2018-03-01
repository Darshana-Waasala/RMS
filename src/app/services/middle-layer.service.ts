import { Injectable } from '@angular/core';
import { Employee } from './data-classes';
import { GeneralService } from './general.service';

@Injectable()
export class MiddleLayerService<T> {

  constructor(
    private genEmpService: GeneralService<Employee>
  ) { }

  // private tempEmployee:Employee;
  private tempItem: T;
  private currentEmployee: Employee;

  ///////////////////// GENERAL ITEM /////////////////////////////////////////////////////
  public setItem(item: T): void {
    this.tempItem = item;
  }
  public getItem(): T {
    return this.tempItem;
  }
  public resetItem(): void {
    this.tempItem = null;
  }

  ///////////////////// CURRENT EMPLOYEE /////////////////////////////////////////////////////
  public setCurrentEmployee(employee: Employee): void {
    this.currentEmployee = employee;
  }
  public getCurrentEmployee(): Employee {
    return this.currentEmployee;
  }
  public resetCurrentEmployee(): void {
    this.currentEmployee = null;
  }

  /**
   * the empLevel need to be taken from the database
   * 1-admin, 2-RM, 3-PM, 4-SSE, 5-SE, 6-QA, 7-BA, 8-Intern
   */
  getEmployeeDesignation(empLevel:Number):string{
    if(empLevel === 1){
      return "admin";
    }else if(empLevel === 2){
      return "resource manager";
    }else if(empLevel === 3){
      return "project manager";
    }else if(empLevel === 4){
      return "senior software engineer";
    }else if(empLevel === 5){
      return "software engineer";
    }else if(empLevel === 6){
      return "Quality Assurence";
    }else if(empLevel === 7){
      return "Business Analysis";
    }else if(empLevel === 8){
      return "Intern";
    }
  }

}
