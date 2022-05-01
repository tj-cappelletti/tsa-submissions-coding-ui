import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoggedIn: Boolean = false;
  year = new Date().getFullYear();

  constructor(private _authService: AuthService) {
    this._authService.loginChanged.subscribe((loggedIn: Boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this._authService.isLoggedIn().then((loggedIn: Boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
  
  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }
}
