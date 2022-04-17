import {AppModule} from '../app.module';
import {Injectable} from '@angular/core';
import {UserManager, User, UserManagerSettings} from 'oidc-client';
import {AppConfig} from '../app-config.component';
import {Subject} from 'rxjs';

@Injectable({providedIn: AppModule})
export class AuthService {
  private _loginChangedSubject = new Subject<boolean>();
  private _user: User | null | undefined;
  private _userManager: UserManager;

  loginChanged = this._loginChangedSubject.asObservable();

  constructor() {
    const userManagerSettings: UserManagerSettings = {
      authority: AppConfig.stsAuthority(),
      client_id: AppConfig.clientId(),
      post_logout_redirect_uri: `${AppConfig.clientRoot}signout-callback`,
      redirect_uri: `${AppConfig.clientRoot}signin-callback`,
      response_type: 'code',
      scope: 'openid  profile role tsa.submissions.coding.read tsa.submissions.coding.create'
    };

    this._userManager = new UserManager(userManagerSettings);
  }

  login() {
    return this._userManager.signinRedirect;
  }

  isLoggedIn(): Promise<Boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;

      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }

      this._user = user;
      return userCurrent;
    });
  }
}
