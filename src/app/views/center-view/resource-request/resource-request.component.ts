import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-resource-request',
  templateUrl: './resource-request.component.html',
  styleUrls: ['./resource-request.component.css']
})
export class ResourceRequestComponent implements OnInit {
  today = new Date();
  requestForm: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.requestForm = this.formBuilder.group({
      startDate:[''],
      endDate:[''],
      allocationType:[''],
      bookingType:[''],
      projectRole:[''],
      percentageOfAllocation:[''],
      rate:[''],
      basedLocation:[''],
      expertise:[''],
      skills:[''],
      email:new FormControl('', [Validators.email,])
    });
  }

  matcher = new MyErrorStateMatcher();

  printValue(){
    console.log(this.requestForm);
  }

  onSubmit(){
    console.log('trying to submit')
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


}
