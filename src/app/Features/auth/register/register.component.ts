import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errMsg: string = '';
  isLoading: boolean = false;

  constructor(private _auth: AuthService, private router: Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.required,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{6}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  //custom validation

  confirmPassword(group: AbstractControl) {
    // getting the value from the form and storing in a constant
    // to be used in the validation to make sure password and confirm pass is the same
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      //if there is an error it will return the error message
      return { passwordNotMatch: true };
    }
  }

  submitForm() {
    // console.log(this.registerForm.value)
    // console.log('touched', this.registerForm.get('name')?.touched)
    // console.log('touched', this.registerForm.get('name')?.errors)
    this.isLoading = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
    } else {
      this._auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
