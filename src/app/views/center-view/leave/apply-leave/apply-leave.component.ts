import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MiddleLayerService } from '../../../../services/middle-layer.service';
import { Employee, Leaves, LeaveDetails, LeavesRemaining, TermParams, EmployeeLevelDetails } from '../../../../services/data-classes';
import { GeneralService } from '../../../../services/general.service';

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
  private today = new Date();
  private leaveRequestForm: FormGroup;
  private leaveTypes: LeaveDetails[];
  private leavesURL: string;
  private isHalfDaySelected: boolean;
  private leavesRemaining: LeavesRemaining;
  private currentEmployeeDetails: EmployeeLevelDetails;
  private currentEmployee:Employee;

  constructor(
    private formBuilder: FormBuilder,
    private middleLayerService: MiddleLayerService,
    private genLeaveService: GeneralService<Leaves>,
    private genLeaveRemainingService: GeneralService<LeavesRemaining>,
    private genEmpLevelDetails:GeneralService<EmployeeLevelDetails>
  ) { }

  ngOnInit() {
    this.createFrom();

    /**
     * this is a temp method until login
     */
    this.updateForm();
    this.setLeaveTypes();
    this.getLeavesRemainingAndAllocated();
  }

  getLeavesRemainingAndAllocated(): void {
    var today = new Date();
    var queryDetails = new Array<TermParams>();

    /**
     * till you get the service ready
     */

     this.middleLayerService.getCurrentEmployee
    this.leavesRemaining = new LeavesRemaining(
      "24","8","18","12","10"
    );

    this.currentEmployeeDetails = new EmployeeLevelDetails(
      2,"manager",new LeavesRemaining("25","10","18","12","10"),120000,
    )
    ///////////////////////////////////////////////


    // this.middleLayerService.getCurrentEmployee().subscribe(
    //   currentEmployee => {
    //     var queryItem_1 = new TermParams("currentUserId", currentEmployee.id.toString());
    //     var qeuryItem_2 = new TermParams("date", today.toDateString());
    //     queryDetails.push(queryItem_1);
    //     queryDetails.push(qeuryItem_2);

    //     this.middleLayerService.getURLs().subscribe(
    //       URLs => {
    //         this.genLeaveRemainingService.getItemsWithMultipleQueries(URLs['leavesRemainingURL'],queryDetails).subscribe(
    //           leavesRemaining=>{
    //             this.leavesRemaining = leavesRemaining[0];
    //           }
    //         );
    //         this.genEmpLevelDetails.post(URLs["employeeLevelDetailsURL"],currentEmployee).subscribe(
    //           EmpLevelDetails =>{
    //             this.currentEmployeeDetails = EmpLevelDetails;
    //           }
    //         );
    //       }
    //     );
    //   }
    // );

  }


  updateForm(): void {
    this.middleLayerService.getCurrentEmployee().subscribe(
      employee => {
        this.leaveRequestForm.patchValue({
          employeeName: employee.lastName,
          designation: employee.employeeLevelId,
          contactDuringLeave: employee.contactNo,
          email: employee.email
        });
      }
    );
  }

  getEmpDesignation(empLevel: number): string {
    var empLevelDetails = []
    this.middleLayerService.getLevelDetails().subscribe(
      data => empLevelDetails
    );
    for (var i = 0; i < empLevelDetails.length; i++) {
      if (empLevelDetails[i].employeeLevel === empLevel) {
        return empLevelDetails[i].levelName;
      }
    }
  }


  createFrom() {
    this.leaveRequestForm = this.formBuilder.group({
      employeeName: [null, Validators.required],
      designation: [null, Validators.required],
      contactDuringLeave: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      leaveType: [null, [Validators.required]],  // 1-full_day 2-first_half 3-second_half
      reason: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      // leaveDuration:[null,[Validators.required]], // k-days and half
      approvedByPM: [false, [Validators.required]],
      approvedByAdmin: [false, [Validators.required]],
    });
  }

  setLeaveTypes() {
    this.middleLayerService.getLeaveDetails().subscribe(
      data => {
        console.log(data);
        this.leaveTypes = data;
      }
    );
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

  autoFillEndDate(field: FormControl): void {

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

  onSubmit() {

    var currentEmployee = this.middleLayerService.getCurrentPMandRM().subscribe(
      data => {
        var leaveToPost = new Leaves(
          data.CurrentEmp.id,
          data.CurrentEmp.lastName,
          data.CurrentEmp.employeeLevelId,
          data.CurrentEmp.email,
          this.leaveRequestForm.value.reason,
          this.leaveRequestForm.value.contactDuringLeave,
          this.leaveRequestForm.value.leaveType,
          this.leaveRequestForm.value.startDate,
          this.leaveRequestForm.value.endDate,
          this.getDuration(),
          data.PMId,
          false,
          false,
          false,
          data.RMId,
          false,
          false,
          false,
          false,
          undefined
        );

        /** finally post this filled form */
        this.middleLayerService.getURLs().subscribe(
          urls => {
            this.genLeaveService.post(urls['allLeavesURL'], leaveToPost).subscribe(
              response => {
                console.log("post is success", response)
              }
            )
          }
        )
      }
    );

  }

  getDuration(): string {
    if (this.leaveRequestForm.value.leaveType === 2 || this.leaveRequestForm.value.leaveType === 3) {
      return "half-day"
    } else {
      return this.getLeaveDurationInDays(this.leaveRequestForm.value.startDate, this.leaveRequestForm.value.endDate).toString();
    }
  }


  /**
   * this method will return the duration in terms of days using following paramentes
   * @param startDate 
   * @param endDate 
   */
  getLeaveDurationInDays(startDate: Date, endDate: Date): number {
    var months = 0;
    if (this.leaveRequestForm.value['leaveType'] === 2 ||
      this.leaveRequestForm.value['leaveType'] === 3) {
      return 0.5;
    } else {
      var startYear = startDate.getFullYear();
      var startMonth = startDate.getMonth() + 1;
      var startDay = startDate.getDate();
      var endYear = endDate.getFullYear();
      var endMonth = endDate.getMonth() + 1;
      var endDay = endDate.getDate();

      if (endYear - startYear === 0) {
        /**leave during the same year */
        if (endMonth - startMonth === 0) {
          /**leave during the same month
           * then end day should defeneitely be grater than the end day
           */
          return (endDay - startDay);
        } else {
          /**
           * leave during different months but in same year
           * here we calculate the months and take the count of long months in between 
           * */

          var months = endMonth - startMonth;
          var monthsWith31stDay = 0;
          for (var i = 0; i < months; i++) {
            /**iterating through months excluding endMonth */
            if ((startMonth + i) % 2 === 0) {
              /** then we have a month ending with 31 days */
              ++monthsWith31stDay;
            }
          }

          if (endDay > startDay) {
            /** the end day is at latter part of the month than the start day */

            return ((months) * 30 + monthsWith31stDay + (endDay - startDay));

          } else {
            /** the end day is smaller than the start day
             * ie. endDay < startDay
             */

            return ((months) * 30 + monthsWith31stDay - (startDay - endDay));

          }

        }
      } else {
        /** leave during different years */
        var fullDuration = 0;
        var leapYears = 0;
        var years = endYear - startYear;
        var monthsEndingWith31 = 0;
        var monthCount = endMonth - startMonth;

        for (var y = 0; y < years; y++) {
          if ((startYear + y) % 4 === 0) {
            ++leapYears;
          }
        }

        for (var m = 0; m < monthCount; m++) {
          if ((startMonth + 1) % 2 === 0) {
            ++monthsEndingWith31;
          }
        }

        if (endMonth > startMonth) {
          /** the end month is a latter month than the start month  */

          if (endDay > startDay) {
            /** end date is appearing after the start date */
            return (years * 365) + leapYears + (monthCount * 30) + monthsEndingWith31 + (endDay - startDay);

          }
          else {
            /** end date is appearing before the start date */
            return (years * 365) + leapYears + (monthCount * 30) + monthsEndingWith31 - (startDay - endDay);
          }
        } else {
          /** when endmonth is smaller than the start monthe
           * ie. end month < start month
           */
          if (endDay > startDay) {
            return (years * 365) + leapYears - (startMonth - endMonth) * 30 - monthsEndingWith31 + (endDay - startDay);
          } else {
            return (years * 365) + leapYears - (startMonth - endMonth) * 30 - monthsEndingWith31 - (startDay - endDay);
          }
        }

      }
    }
  }



  leaveTypeSelected(leaveNumber: number) {
    console.log("in the leave type selected", leaveNumber);
    if (leaveNumber === 2 || leaveNumber === 3) {
      this.isHalfDaySelected = true;
      this.leaveRequestForm.patchValue({
        endDate: this.leaveRequestForm.value.startDate
      });
    }
  }

  startDateSelected(startDate: Date) {
    if (this.isHalfDaySelected) {
      this.leaveRequestForm.patchValue({
        // endDate:this.leaveRequestForm.value.startDate
        endDate: startDate
      });
    }
  }



}
