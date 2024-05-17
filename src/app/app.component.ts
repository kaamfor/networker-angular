import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Networker';
  isLoggedIn?: boolean = undefined;

  userObservable?: Subscription;

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    let userId: any;
    this.userObservable = this.authService.getUser().subscribe(
      user => {
        this.isLoggedIn = user !== null;
        userId = user?.uid;
      },
      error => {
        this.isLoggedIn = false;
        
        this.userObservable?.unsubscribe();
        this.userObservable = undefined;
      },
      () => {
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
        localStorage.setItem('userId', JSON.stringify(userId));
      });
  }

  ngOnDestroy(): void {
    this.userObservable?.unsubscribe();
    this.userObservable = undefined;
  }

  sidenavMenuClicked(sidenav: MatSidenav) {
    sidenav.close();
  }
}
