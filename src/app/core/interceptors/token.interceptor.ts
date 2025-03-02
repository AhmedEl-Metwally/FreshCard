import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // console.log(req);
  
  req =req.clone({
    setHeaders: {
      token: localStorage.getItem("userToken")!
    }
  })


  return next(req);
};
