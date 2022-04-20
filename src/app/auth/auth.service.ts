import { AppModule } from '../app.module';
import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { AppConfig } from '../app-config.component';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './user-profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loginChangedSubject = new Subject<boolean>();
  private _user: User | null | undefined;
  private _userManager: UserManager;

  userProfile:UserProfile|undefined;
  loginChanged = this._loginChangedSubject.asObservable();

  constructor(private _httpClient: HttpClient) {
    const userManagerSettings: UserManagerSettings = {
      authority: AppConfig.stsAuthority(),
      automaticSilentRenew: true,
      client_id: AppConfig.clientId(),
      post_logout_redirect_uri: `${AppConfig.clientRoot()}signout-callback`,
      redirect_uri: `${AppConfig.clientRoot()}signin-callback`,
      response_type: 'code',
      scope: 'openid profile role tsa.submissions.coding.read tsa.submissions.coding.create'
    };

    this._userManager = new UserManager(userManagerSettings);
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  completeLogout() {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<Boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;

      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }

      if(userCurrent && !this.userProfile) {
        this.userProfile = new UserProfile();
        this.userProfile.id = user.profile.name;
        this.userProfile.email = user.profile.email;
        this.userProfile.firstName= user.profile.given_name;
        this.userProfile.lastName= user.profile.family_name;
        this.userProfile.role= user.profile['role'];
      }

      this._user = user;
      return userCurrent;
    });
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }
}
