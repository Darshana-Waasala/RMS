import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router:Router
  ) { }

  canActivate(){
    console.log('can activete called=====================================');
    if(localStorage.getItem('isLoggedin') === "true"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
    }
  }

  canActivateChild(){
    if(localStorage.getItem('isLoggedin') === "true"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
    }
    console.log('can activage child called================================');
  }

}
