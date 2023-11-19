import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Properties of component in general
  registrationFailed = false;

  // Controls
  loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
  birthYearCtrl = this.fb.control<number | null>(null, [
    Validators.required,
    Validators.min(1900),
    Validators.max(new Date().getFullYear())
  ]);
  passwordCtrl = this.fb.control('', [Validators.required]);
  confirmPasswordCtrl = this.fb.control('', [Validators.required]);
  // Password group
  passwordGroup = this.fb.group(
    {
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    },
    {
      validators: [RegisterComponent.passwordMatch]
    }
  );

  userForm = this.fb.group({
    login: this.loginCtrl,
    birthYear: this.birthYearCtrl,
    passwordForm: this.passwordGroup
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  static passwordMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      return { matchingError: true };
    }
    return null;
  }

  register() {
    const login = this.userForm.get('login')?.value;
    const birthYear = this.userForm.get('birthYear')?.value;
    const password = this.userForm.get('passwordForm.password')?.value;
    console.log('called');

    if (
      login !== null &&
      login !== undefined &&
      birthYear !== null &&
      birthYear !== undefined &&
      password !== null &&
      password !== undefined
    ) {
      this.userService.register(login, password, birthYear).subscribe(
        response => {
          this.router.navigateByUrl('/');
        },
        err => {
          this.registrationFailed = true;
        }
      );
    }
  }
}
