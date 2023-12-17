import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(private authService: AuthService, private router: Router){}

    isLoginMode = true;
    isLoading = false;
    error: string | null = null;

    onswitchMode(){
      this.isLoginMode = !this.isLoginMode;
      if(!this.isLoginMode){
        this.router.navigate(['/signin']);
      }
    }
    onSubmit(form: NgForm){
      if(!form.valid) return;
      const email = form.value.email;
      const password = form.value.password;
      let authObs: Observable<AuthResponseData>;
      this.isLoading = true;
      if(this.isLoginMode){
        authObs = this.authService.login(email,password)
      }
      else{
        authObs = this.authService.signup(email, password)
      }
      authObs.subscribe(
        resData=>{
          console.log(resData);
          this.router.navigate(['/find-job']);
          this.isLoading=false;
        }, errMessage=>{
          console.log(errMessage);
          this.error = errMessage;
          this.isLoading=false;
        }
      );
      form.reset();
    }
}
