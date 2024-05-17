import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/devices');
    }

    if (this.storedEmail?.length) {
      this.loginForm.patchValue({
        email: this.storedEmail,
        rememberMe: true
      });
    }
  }

  loginForm = this.createForm({
    email: '',
    password: '',
    rememberMe: false
  });

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') as string) as boolean;
  }

  get storedEmail() {
    return localStorage.getItem('rememberedEmail') as string;
  }
  set storedEmail(email: string) {
    localStorage.setItem('rememberedEmail', email);
  }

  createForm(model: UserLogin) {
    let form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required]
    });
    form.setValue(model);

    return form;
  }

  submitLogin() {
    let creds = { ...this.loginForm.value };
    if (this.loginForm.valid && creds.email && creds.password) {
      creds.rememberMe = creds.rememberMe as boolean;

      this.authService.login(creds.email, creds.password).then(
        result => {
          if (creds.rememberMe) {
            this.storedEmail = creds.email as string;
          }
          else {
            this.storedEmail = '';
          }
          this.router.navigateByUrl('/devices');
        },
        reason => {
          this.loginError = reason.message;
        });
    }
  }
}
