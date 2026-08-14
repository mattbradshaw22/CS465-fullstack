import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authentication } from '../services/authentication';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authentication = inject(Authentication);

  let isAuthAPI: boolean;   // bool value for /login & /register api endpoints

  if (                              // if url is login or register api endpoint
    req.url.includes('/login') ||
    req.url.includes('/register')
  ) {
    isAuthAPI = true;               // isAuthAPI set to false
  } else {
    isAuthAPI = false;              // else set to true
  }

  // if loggedin and not at the login or regester API endpoint 
  // set authToken to the token from authentication service
  if (authentication.isLoggedIn() && !isAuthAPI) {   
    const authToken = authentication.getToken();

    // clone the request as a new request and append header with token details
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });  

    // return cloned request with updated headers
    return next(newReq);
  } else {
      return next(req);
  }
};