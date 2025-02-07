import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs';
import {AuthenticationService} from "./authentication-service.service";

export const authGuard = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );
};
