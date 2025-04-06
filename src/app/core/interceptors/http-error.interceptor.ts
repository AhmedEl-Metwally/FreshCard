import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastrService: ToastrService = inject(ToastrService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        _toastrService.warning('Please login again', 'Unauthorized');
      } else if (err.status === 403) {
        _toastrService.error('You do not have permission to access this resource', 'Forbidden');
      } else if (err.status === 0) {
        _toastrService.error('Cannot connect to the server', 'Network Error');
      } else {
        const errorMessage = err.error?.message || 'Something went wrong';
        _toastrService.error(errorMessage, 'Error');
      }

      return throwError(() => err);
    })
  );
};
