import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JudgeRouteGuard implements CanActivate {
    constructor(private _authService:AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const canActivate = !!this._authService.userProfile && this._authService.userProfile.role === 'judge';
        return canActivate;
    }
}