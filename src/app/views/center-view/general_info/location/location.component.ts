import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { concat } from 'rxjs/operators/concat';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; // for the popup

import { JsonService } from '../../../../services/json.service';
import { GeneralService } from '../../../../services/general.service'
import { MiddleLayerService } from '../../../../services/middle-layer.service';

import { Project, TrainingProgram, Employee } from '../../../../services/data-classes';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  employeeForm: FormGroup;
  employeeLevels = [
    { name: 'Level 1', value: 1 },
    { name: 'Level 2', value: 2 },
    { name: 'Level 3', value: 3 },
    { name: 'Level 4', value: 4 }
  ]
  gender = [
    { name: 'male', value: 'male' },
    { name: 'female', value: 'female' }
  ]
  maritalStatus = [
    { name: 'married', value: 'married' },
    { name: 'single', value: 'single' }
  ]
  bloodGroups = [
    { name: 'AB+', value: 'AB+' },
    { name: 'AB-', value: 'AB-' },
    { name: 'A+', value: 'A+' },
    { name: 'A-', value: 'A-' },
    { name: 'B+', value: 'B+' },
    { name: 'B-', value: 'B-' },
    { name: 'O+', value: 'O+' },
    { name: 'O-', value: 'O-' },
  ]
  matcher = new MyErrorStateMatcher();
  // today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  today = new Date();
  private skillURL: string;
  private qualificationURL: string;
  private pastProjectURL: string;
  private trainingProgramsURL: string;
  listOfSkills: Array<string>;
  listOfQualifications: Array<string>;
  listOfPastProjects: Array<Project>;
  listOfTrainingPrograms: Array<TrainingProgram>;
  isToEdit:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private jsonService: JsonService,
    private genService: GeneralService<string>,
    private pastProjectService: GeneralService<Project>,
    private trainingProgramService: GeneralService<TrainingProgram>,
    private genEmpService:GeneralService<Employee>,
    private location: Location,
    private mdLayerService: MiddleLayerService,
    public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.createFrom();
    console.log('constructor first');
  }

  public goBack() {
    this.location.back();
  }

  createFrom() {
    this.employeeForm = this.formBuilder.group({
      employeeLevel: [null, Validators.required],
      fullName: [null, [Validators.required, Validators.minLength(4)]],
      firstName: [null, [Validators.required, Validators.minLength(4)]],
      lastName: [null, [Validators.required, Validators.minLength(4)]],
      address: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.email, Validators.required]],
      nic: [null, [Validators.required, Validators.minLength(10)]],
      birthday: [Date, [Validators.required]],
      gender: [null, Validators.required],
      skills: [null, Validators.required],
      experience: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      contactNo: [null, [Validators.required, Validators.minLength(10)]],
      qualifications: [null, Validators.required],
      visaDetails: this.formBuilder.group({
        visaAvailablity: [null, Validators.required],
        attribute_1: null,
        attribute_2: null,
      }),
      bloodGroup: [null],
      religion: [null, Validators.required],
      nationality: [null, Validators.required],
      comments: [null],
      joinedDate: [Date, Validators.required],
      pastProjects: [null],
      trainingProgramsParticipated: [null],
    });
  }

  ngOnInit() {
    this.isToEdit=false;
    console.log(this.employeeForm);
    console.log('ngOnInit after constructor');
    this.getSkillURL();
    this.getQualificationURL();
    this.chackFordata();
  }

  chackFordata() {
    if (this.mdLayerService.getItem() !== null && this.mdLayerService.getItem() !== undefined) {
      var tempEmployee = this.mdLayerService.getItem(); // get data from service
      this.mdLayerService.resetItem(); // remove the temp data
      this.isToEdit = true; // setting the flag that we have come to edit the form
      this.employeeForm.setValue({
        employeeLevel: tempEmployee.employeeLevel,
        fullName: tempEmployee.fullName,
        firstName: tempEmployee.firstName,
        lastName: tempEmployee.lastName,
        address: tempEmployee.address,
        email: tempEmployee.email,
        nic: tempEmployee.nic,
        birthday: new Date(tempEmployee.birthday),
        gender: tempEmployee.gender,
        skills: tempEmployee.skills,
        experience: tempEmployee.experience,
        maritalStatus: tempEmployee.maritalStatus,
        contactNo: tempEmployee.contactNo,
        qualifications: tempEmployee.qualifications,
        // visaDetails
        visaDetails: {
          visaAvailablity: tempEmployee.visaDetails.visaAvailablity,
          attribute_1: tempEmployee.visaDetails.attribute_1,
          attribute_2: tempEmployee.visaDetails.attribute_2,
        },
        // visaAvailablity: tempEmployee.visaDetails.visaAvailablity,
        // attribute_1: tempEmployee.visaDetails.attribute_1,
        // attribute_2: tempEmployee.visaDetails.attribute_2,
        bloodGroup: tempEmployee.bloodGroup,
        religion: tempEmployee.religion,
        nationality: tempEmployee.nationality,
        comments: tempEmployee.comments,
        joinedDate: new Date(tempEmployee.joinedDate),
        pastProjects: tempEmployee.pastProjects,
        trainingProgramsParticipated: tempEmployee.trainingProgramsParticipated,
      })
    }
  }

  getSkillURL() {
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.getListOfSkills(response['skillURL']);
        this.skillURL = response['skillURL'];
      }
    )
  }

  getListOfSkills(url: string) {
    this.listOfSkills = [
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
    ]
    // this.genService.get(url).subscribe(
    //   skills => {
    //     console.log(skills);
    //     this.listOfSkills = skills;
    //   }
    // );
  }

  getQualificationURL() {
    this.jsonService.getURL().subscribe(
      (response: Response) => {
        this.getListOfQualifications(response['qualificationsURL']);
        this.qualificationURL = response['qualificationsURL'];
      }
    );
  }

  getListOfQualifications(url: string) {
    this.listOfQualifications = [
      "ocjp",
      "qualification_2",
      "qualification_3",
      "qualification_4",
      "qualification_5",
      "qualification_6",
      "qualification_7",
      "qualification_8",
      "qualification_9",
      "qualification_10",
      "qualification_11",
      "qualification_12",
      "qualification_13"
    ]
    // this.genService.get(url).subscribe(
    //   response => {
    //     this.listOfQualifications = response;
    //   }
    // );
  }

  getPastProjectURL() {
    this.jsonService.getURL().subscribe(
      (response: Response) => {

      }
    )
  }

  getListOfPastProjects(url: string) {
    this.pastProjectService.get(url).subscribe(
      response => {
        this.listOfPastProjects = response;
      }
    )
  }

  print() {
    console.log(this.employeeForm.value);
  }

  onSubmit() {
    console.log(this.employeeForm)
    this.mdLayerService.getURLs().subscribe(
      URLs=>{
        this.genEmpService.post(URLs["addEmployeeURL"],this.employeeForm.value).subscribe(
          result => console.log(result)
        );
      }
    );
  }

  onNoClick(){
    this.dialogRef.close();
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

  isFieldLengthEnough(field: FormControl): boolean {

    // checking if the form control has any errors
    if (field.errors !== null) {
      if (field.errors.hasOwnProperty('minlength')) {
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
