import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Project, Employee } from '../../../../services/data-classes';
import { GeneralService } from '../../../../services/general.service';
import { MiddleLayerService } from '../../../../services/middle-layer.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projectForm: FormGroup;
  
  matcher = new MyErrorStateMatcher();
  // today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  today = new Date();
  private allPMsWithoutProject:Array<Employee>;
  private allEmployeesWithoutProject:Array<Employee>;
  private allResourceManagers:Array<Employee>;
  private projCategories:Array<string>;
  private projTechnologies:Array<string>;
  private projDevMethods:Array<string>;
  private projSituations:Array<string>;

  constructor(
    private formBuilder: FormBuilder,
    // private location: Location,
    private middleService:MiddleLayerService,
    private genEmployeeService:GeneralService<Employee>,
    private genProjectService:GeneralService<Project>,
    private genStringService:GeneralService<string>,
    public dialogRef: MatDialogRef<NewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.createFrom();
  }

  public goBack() {
    // this.location.back();
  }

  createFrom() {
    this.projectForm = this.formBuilder.group({
      id:[null],
      projectName: [null, [Validators.required, Validators.minLength(4)]],
      projectManagerId: [null, [Validators.required]],
      resourceManagerId: [null, [Validators.required]],
      budjet: [null, [Validators.required]],
      totalExpencesUptoNow: [null],
      startDate: [null, [Validators.required]],
      deadLine: [null, [Validators.required]],
      projectTeam: [null],
      expectedIncome: [null, Validators.required],
      comments: [null],
      customer: [null, Validators.required],
      projectCatogary: [null, Validators.required],
      technologiesUsed: [null],
      developmentMethodalogy: [null],
      projectSituation: [null]
    });
    this.chackFordata();
  }

  ngOnInit() {
    this.chackFordata();
  }

  chackFordata() {
    if(this.data.hasOwnProperty('toEdit')){
      if (this.data.toEdit === true) {
        this.projectForm.setValue({
          id:this.data.id,
          budjet: this.data.budjet,
          comments: this.data.comments,
          customer: this.data.customer,
          deadLine: new Date(this.data.deadLine),
          developmentMethodalogy: this.data.developmentMethodalogy,
          expectedIncome: this.data.expectedIncome,
          projectCatogary: this.data.projectCatogary,
          projectManagerId:this.data.projectManagerId,
          projectName:this.data.projectName,
          projectSituation:this.data.projectSituation,
          projectTeam:this.data.projectTeam,
          resourceManagerId:this.data.resourceManagerId,
          startDate:new Date(this.data.startDate),
          technologiesUsed:this.data.technologiesUsed,
          totalExpencesUptoNow:this.data.totalExpencesUptoNow,
        });
      }
      else{
        this.getAllDataLists();
      }
    }else{
      console.log('data object is not passed properly');
    }
  }

  getAllDataLists(){

    /**
     * used only until the API getting ready
     * as API is ready remove these and use the commented parts in this method
     */
    this.projCategories = ['critical','urgent','economical','quality conserned','high accurate','life thretning'];
    this.projTechnologies = ['java','javascript','sql','nodejs','angular','jquery'];
    this.projDevMethods = ['extreeme programming','agile','waterfall','prototyping','spiral'];
    this.projSituations = ['pending','ongoing','past'];
    this.middleService.getURLs().subscribe(
      URLs=>{
        var emp = new Employee(2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
        this.genEmployeeService.postForArray(URLs['employeeURL'],emp).subscribe(
          rms=>this.allResourceManagers=rms
        );
        var emp2 = new Employee(4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
        this.genEmployeeService.postForArray(URLs['employeeCurrentProjNullURL'],emp2).subscribe(
          emps=>this.allEmployeesWithoutProject=emps
        );
        var emp3 = new Employee(3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
        this.genEmployeeService.postForArray(URLs['employeeCurrentProjNullURL'],emp3).subscribe(
          pms=>this.allPMsWithoutProject=pms
        );
      }
    );
    
    // this.middleService.getURLs().subscribe(
    //   URLs=>{
    //     this.genEmployeeService.get(URLs['allPMsWithoutProjectURL']).subscribe(
    //       PMs=>this.allPMsWithoutProject = PMs
    //     );
    //     this.genEmployeeService.get(URLs['allEmployeesWithoutProjectURL']).subscribe(
    //       emps=>this.allEmployeesWithoutProject=emps
    //     );
    //     this.genEmployeeService.get(URLs['allRMsURL']).subscribe(
    //       RMs => this.allResourceManagers = RMs
    //     );
    //     this.genStringService.get(URLs['projectCategoriesURL']).subscribe(
    //       catogaries => this.projCategories = catogaries
    //     );
    //     this.genStringService.get(URLs['projectTechnologiesURL']).subscribe(
    //       techs=>this.projTechnologies = techs
    //     );
    //     this.genStringService.get(URLs['projectDevelopmentMethodalogiesURL']).subscribe(
    //       devMethods => this.projDevMethods = devMethods
    //     );
    //     this.genStringService.get(URLs['projectSituationsURL']).subscribe(
    //       situations => this.projSituations = situations
    //     )
    //   }
    // );
  }



  onSubmit() {
    
    this.middleService.getURLs().subscribe(
      Urls=>this.genProjectService.post(Urls['editedOrNewProjectURL'],this.projectForm.value).subscribe(
        result=>{
          console.log('this is the result',result);
          this.dialogRef.close();
        }
      )
    );
    
  }
  print(){

  }
  formState(){
    console.log(this.projectForm);
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
