import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

 let spinner = inject(NgxSpinnerService);

  spinner.show();

  //show spinner
  return next(req).pipe(finalize(()=>{
    spinner.hide();
  }));



  //hide spinner

};
