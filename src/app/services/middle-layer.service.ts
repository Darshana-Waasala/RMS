import { Injectable } from '@angular/core';
import { Employee } from './data-classes';

@Injectable()
export class MiddleLayerService {

  constructor() { }

  private tempEmployee:Employee;

  public setEmployee(employee:Employee):void{
    console.log('setting employee : ');
    console.log(employee);
    this.tempEmployee = employee;
  }

  public getEmployee():Employee{
    return this.tempEmployee;
  }

  public resetEmployee():void{
    this.tempEmployee = null;
  }

}
