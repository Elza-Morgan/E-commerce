import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    errMsg:string="";
    isLoading:boolean =false;
  
    constructor(private _auth:AuthService, private router:Router){}
  
   loginForm:FormGroup = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })

  
    submitForm(){
      this.isLoading =true;
      if(this.loginForm.valid){
        this._auth.login(this.loginForm.value).subscribe({
          next: (res:any) => {
            this.isLoading=false;
            if(res.message == "success"){
              this.router.navigate(['/home'])
              //& storing the token in local storage of a user
              //& used with API that relates from user to user
              //& can be used to show or hide something
              localStorage.setItem('userToken',res.token)
              //& this is used to force to refresh the page automatically in order the number of carts show 
              //& and log-out shows up
              window.location.reload();
              // console.log('in submit',localStorage.getItem('userToken'))
            }
          },
          error: (err) => {
            this.isLoading=false;
            this.errMsg=err.error.message;
          }
        })
      }
      
    }

}
