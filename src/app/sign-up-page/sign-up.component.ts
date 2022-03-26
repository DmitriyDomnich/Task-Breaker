import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { FormErrors } from '../shared/form-errors';
import { samePasswordValidator } from './same-password.validator';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatedPassword: [
        '',
        [Validators.required, Validators.minLength(6), samePasswordValidator()],
      ],
    });
  }

  async onSubmit(submitEv: SubmitEvent) {
    submitEv.preventDefault();
    if (this.signUpForm.valid) {
      try {
        await this.auth.signUpWithEmailAndPassword(
          this.email.value,
          this.password.value
        );
        this.router.navigateByUrl('');
      } catch (error: any) {
        this.signUpForm.setErrors({
          creationError: true,
        });
      }
    }
  }
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  get repeatedPassword() {
    return this.signUpForm.get('repeatedPassword') as FormControl;
  }
  getErrorMessages(formControl: FormControl) {
    return FormErrors.getErrorMessages(formControl);
  }
}
