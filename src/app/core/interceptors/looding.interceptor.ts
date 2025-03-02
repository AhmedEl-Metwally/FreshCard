import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loodingInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner = inject(NgxSpinnerService)

_spinner.show()

  return next(req).pipe(
    finalize(() => _spinner.hide())
  )
};
