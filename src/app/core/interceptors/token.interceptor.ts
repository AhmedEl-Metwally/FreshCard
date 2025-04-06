
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token
      }
    });
  }

  return next(req);
};
