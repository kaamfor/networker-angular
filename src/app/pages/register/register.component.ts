import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

interface UserSignup extends User {
  rePassword: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() registerUser?: User;

  signupInfo: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/devices');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registerUser'].currentValue != changes['registerUser'].previousValue && this.registerUser !== undefined) {
      this.registerForm = this.createForm({ ...this.registerUser, rePassword: '' });
    }
  }
  
  registerForm = this.createForm({
    email: '',
    password: '',
    rePassword: ''
  });

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') as string) as boolean;
  }

  createForm(model: UserSignup) {
    let form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    });
    form.setValue(model);

    return form;
  }

  async submitSignup() {
    let creds = { ...this.registerForm.value };
    if (this.registerForm.valid && creds.email && creds.password && creds.rePassword) {
      
      if (creds.password != creds.rePassword) {
        this.signupInfo = "ERROR: passwords differ.";
        return;
      }
      
      try {
        await this.authService.register(creds.email, creds.password)

        this.authService.login(creds.email, creds.password).then(
          _ => this.router.navigateByUrl('/'),
          _ => this.signupInfo = "ERROR: cannot log in after signup"
        );
      }
      catch (reason: any) {
        this.signupInfo = "ERROR: " + reason.message;
      }
    }
  }
}
