import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { ForgetPasswordService } from '../../../core/services/forget password/forget-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rest-password.component.html',
  styleUrl: './rest-password.component.scss',
})
export class RestPasswordComponent {
  //& this flag is used in html to toggle which form to display in HTML
  steps: number = 1;

  constructor(
    private _ForgetPasswordService: ForgetPasswordService,
    private toaster: ToastrService,
    private auth:AuthService,
    private router:Router
  ) {}

  //& form for the email
  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
  });

  submitEmail() {
    this._ForgetPasswordService.verifyEmail(this.sendEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.statusMsg == 'success') {
          this.steps = 2;
          this.toaster.success(res.message,'success',{
            closeButton:true,
            progressBar:true,
            progressAnimation:'increasing',
            timeOut:2000,
            positionClass:'toast-top-left'
          });
        }
      },
      error: (err) => {
        this.toaster.error(err.message,'error')
      },
    });
  }

  //& form for the Code

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  submitCode(){
    this._ForgetPasswordService.verifyCode(this.verifyCode.value).subscribe({
        next:(res) =>{
          if(res.status == 'Success'){
            this.steps=3;
          }
        }
    })


  }

  //& form for the rest password
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
    ]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  submitPassword(){
    this._ForgetPasswordService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        if(res.token){
          localStorage.setItem('userToken',res.token);

          //used to decode 
          this.auth.HandlingDecodeUserData();
          this.router.navigate(['/home'])
        }
      }
    })
  }
}
