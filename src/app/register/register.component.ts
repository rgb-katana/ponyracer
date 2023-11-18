import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginCtrl = this.fb.control('', [Validators.required]);
  passwordCtrl = this.fb.control('', [Validators.required]);
  birthYearCtrl = this.fb.control<number | null>(null, [Validators.required]);

  userForm = this.fb.group({
    login: this.loginCtrl,
    password: this.passwordCtrl,
    birthYear: this.birthYearCtrl
  });

  constructor(private fb: FormBuilder) {}

  register() {}
}
