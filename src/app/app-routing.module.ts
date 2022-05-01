import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JudgeRouteGuard } from './auth/judge-route-guard';
import { SigninRedirectCallbackComponent } from './auth/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './auth/signout-redirect-callback.component';
import { SilentCallbackComponent } from './auth/silent-callback.component';
import { ChallangeListComponent } from './challange/challange-list.component';
import { ChallangeComponent } from './challange/challange.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TeamListComponent } from './team/team-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenges', component: ChallangeListComponent },
  { path: 'challenges/:challengeId', component: ChallangeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'silent-callback', component: SilentCallbackComponent },
  { path: 'teams', component: TeamListComponent, canActivate: [JudgeRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
