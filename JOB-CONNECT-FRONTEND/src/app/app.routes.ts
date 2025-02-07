import {Router, Routes} from '@angular/router';
import {ListJobComponent} from "./job/list-job/list-job.component";
import {LoginComponent} from "./user/login/login.component";
import {inject} from "@angular/core";
import {AuthenticationService} from "./user/authentication-service.service";
import {map} from "rxjs";
import {authGuard} from "./user/auth.guard";
import {CreateJobComponent} from "./job/create-job/create-job.component";
import {JobDetailsComponent} from "./job/job-details/job-details.component";
import {RegisterComponent} from "./user/register/register.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => {
      const authService = inject(AuthenticationService);
      const router = inject(Router);

      return authService.isAuthenticated$.pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            return router.createUrlTree(['/home']);
          }
          return true;
        })
      );
    }]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => {
      const authService = inject(AuthenticationService);
      const router = inject(Router);

      return authService.isAuthenticated$.pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            return router.createUrlTree(['/home']);
          }
          return true;
        })
      );
    }]
  },
  {path: 'home', component: ListJobComponent, canActivate: [authGuard]},
  {path: 'create', component: CreateJobComponent, canActivate: [authGuard]},
  {path: 'details/:id', component: JobDetailsComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: 'home'}
];
