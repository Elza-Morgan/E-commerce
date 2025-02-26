import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const checkTokenSkipTestGuard: CanActivateFn = (route, state) => {
  
    let _Auth:AuthService = inject(AuthService)
    let router=inject(Router)
    if(_Auth.userDataToken.getValue() == null){
      return true;
    }
    router.navigate(['/home'])
    return false;
  
  
  return true;
};
