import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

let platformID = inject(PLATFORM_ID);

if(isPlatformBrowser(platformID)){

  req = req.clone({
    setHeaders:{token:localStorage.getItem('userToken') || ''}
  })

}

  return next(req);
};
