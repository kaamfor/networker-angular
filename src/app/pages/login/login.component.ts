import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

interface UserLogin extends User {
  rememberMe: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnChanges, OnInit {
  @Input() loginUser?: User;

  loginError: string|null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loginUser'].currentValue != changes['loginUser'].previousValue && this.loginUser !== undefined) {
      this.loginForm = this.createForm({...this.loginUser, rememberMe: false});
    }
  }

  ngOnInit(): void {
    // TODO: get stored params
  }

  loginForm = this.createForm({
    email: '',
    password: '',
    rememberMe: false
  });

  createForm(model: UserLogin) {
    return this.fb.group(model);
  }

  submitLogin() {
    let creds = { ...this.loginForm.value };
    if (this.loginForm.valid && creds.email && creds.password) {
      creds.rememberMe = creds.rememberMe as boolean;

      this.authService.login(creds.email, creds.password).then(
        result => {
          this.router.navigateByUrl('/devices');
        },
        reason => {
          this.loginError = reason.message;
        });
    }
  }
}
