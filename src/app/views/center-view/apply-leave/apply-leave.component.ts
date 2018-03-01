import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MiddleLayerService } from '../../../services/middle-layer.service';
import { Employee } from '../../../services/data-classes';
import { GeneralService } from '../../../services/general.service';
import { JsonService } from '../../../services/json.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  // today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  today = new Date();
  leaveRequestForm: FormGroup;
  currentEmployee:Employee;
  leaveTypes:string[];

  constructor(
    private formBuilder: FormBuilder,
    private middleEmployeeService: MiddleLayerService<Employee>,
    private genEmpService: GeneralService<Employee>,
    private jsonService: JsonService,
  ) { }

  ngOnInit() {
    this.createFrom();


    /**
     * this is a temporal way to get the logged user.
     * do the bellow commented way for full implementation
     */
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.genEmpService.getById(response['employeeURL'],Math.floor(Math.random()*100+1)).subscribe(
          response =>{
            this.currentEmployee = response;
            this.updateForm();
          }
        )
      }
    );
    // this.currentEmployee = this.middleEmployeeService.getCurrentEmployee();


    this.setLeaveTypes();
  }

  updateForm():void{
    this.leaveRequestForm.patchValue({
      employeeName: this.currentEmployee.lastName,
      designation: this.currentEmployee.employeeLevel,
      contactDuringLeave: this.currentEmployee.contactNo,
      email: this.currentEmployee.email
    })
  }


  createFrom() {
    this.leaveRequestForm = this.formBuilder.group({
      employeeName: [null, Validators.required],
      designation: [null,Validators.required],
      contactDuringLeave: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      leaveType: [null, [Validators.required]],  // 1-full_day 2-first_half 3-second_half
      reason: [null, [Validators.required]],
      startDate:[null,[Validators.required]],
      endDate:[null,[Validators.required]],
      // leaveDuration:[null,[Validators.required]], // k-days and half
      approvedByPM:[false,[Validators.required]],
      approvedByAdmin:[false,[Validators.required]],
    });
  }

  setLeaveTypes(){
    this.leaveTypes = [
      'full-day',
      'first-half',
      'second-half'
    ]
  }

  isFieldRequired(field: FormControl): boolean {

    // checking if the form control has any errors
    if (field.errors !== null) {
      if (field.errors.hasOwnProperty('required') && !field.errors.hasOwnProperty('matDatepickerParse')) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  isEmailValid(field: FormControl): boolean {
    if (field.errors !== null) {
      if (field.errors.hasOwnProperty('email') && !field.errors.hasOwnProperty('required')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  autoFillEndDate(field:FormControl):void{
    
  }

  isDateOK(field: FormControl): boolean {
    if (field.errors !== null) {
      if (field.errors.hasOwnProperty('matDatepickerParse')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onSubmit(){

  }

  print(item:any){
    console.log(item)
  }


}
