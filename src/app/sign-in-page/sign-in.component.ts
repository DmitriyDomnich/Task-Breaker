import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { distinct, from, tap } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { FormErrors } from '../shared/form-errors';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  showPassword = false;
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user && !this.isLoggedIn) {
        console.log(user, this.isLoggedIn);
        this.isLoggedIn = true;
        this.authService
          .checkIfNewUser(user.uid)
          .pipe(
            tap((isNewUser) => {
              console.log(isNewUser, 'is new user');
              if (isNewUser) {
                this.authService.createUser(<User>user);
              }
            })
          )
          .subscribe();
        this.router.navigateByUrl('');
      } else {
        this.isLoggedIn = false;
      }
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(submitEv: SubmitEvent) {
    submitEv.preventDefault();

    try {
      await this.authService.signInWithEmailAndPassword(
        this.email?.value,
        this.password?.value
      );
    } catch (error: any) {
      this.signInForm.setErrors({
        account: true,
      });
    }
  }
  async signWithGoogle() {
    this.authService.signInWithGoogle();
  }
  async signWithGithub() {
    this.authService.signInWithGithub();
  }
  get email() {
    return this.signInForm.get('email') as FormControl;
  }
  get password() {
    return this.signInForm.get('password') as FormControl;
  }
  getErrorMessages(formControl: FormControl) {
    return FormErrors.getErrorMessages(formControl);
  }
}
