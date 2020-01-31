import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req : HttpRequest<any>, next : HttpHandler) {
        //if (req.url) we can control the interceptor by filtering by the url 
        console.log('Request is on its way');
        //the original request is immutable, so we need to clone it
        const modifiedRequest = req.clone({headers : req.headers.append('Auth', 'RafalPassword')}); //this will return a new headers object 
        return next.handle(modifiedRequest); //lets the request continue to go 
    }
}