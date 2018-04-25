import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Employee } from '../../../services/data-classes';
import { MiddleLayerService } from '../../../services/middle-layer.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  emailFormControl:FormControl;
  matcher:MyErrorStateMatcher;
  password:string;

  constructor(
    private router:Router,
    private genEmpService:GeneralService<Employee>,
    private mdLayerService:MiddleLayerService,
  ) { }

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  
    this.matcher = new MyErrorStateMatcher();
    this.password = '';
  }
  
  login(){
    // var emp1:Employee;
    // emp1.password = this.password;
    // emp1.email = this.emailFormControl.value;
    var emp = new Employee(null,null,null,null,null,this.emailFormControl.value,null,
    this.password,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.mdLayerService.getURLs().subscribe(
      URLs=>{
        this.genEmpService.postAnyReturn(URLs["loginURL"],emp).subscribe(
          resultEmp =>{
            if( resultEmp instanceof Employee){
              this.mdLayerService.setCurrentEmployee(resultEmp);
              localStorage.setItem('isLoggedin','true');
              this.router.navigate(['']);
            }else if(resultEmp === 'incorrect password'){ // if password wrong
              console.log("password wrong");
            }else if(resultEmp === 'invalid login attempt'){
              console.log("no user");
            }
            

          }
        );
      }
    );
  }

  testing(){
    // var emp1:Employee;
    // emp1.password = this.password;
    // emp1.email = this.emailFormControl.value;
    var emp = new Employee(null,null,null,null,null,this.emailFormControl.value,null,
      this.password,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
    console.log(emp);
  }


}
