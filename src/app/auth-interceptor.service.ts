import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req : HttpRequest<any>, next : HttpHandler) {
        //if (req.url) we can control the interceptor by filtering by the url 
        console.log('Request is on its way');
        return next.handle(req); //lets the request continue to go 
    }
}