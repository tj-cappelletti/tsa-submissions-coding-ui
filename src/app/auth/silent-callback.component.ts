import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-silent-callback',
  template: ''
})
export class SilentCallbackComponent implements OnInit {

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.silentSignInAuthentication();
  }
}
