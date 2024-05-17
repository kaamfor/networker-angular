import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) {
    authService.logout()
      .catch(reason => console.log(reason))
      .finally(() => router.navigateByUrl('/'));
  }
}
