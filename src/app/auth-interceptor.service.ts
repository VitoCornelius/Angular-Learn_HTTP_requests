import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req : HttpRequest<any>, next : HttpHandler) {
        //if (req.url) we can control the interceptor by filtering by the url 
        console.log('Request is on its way');
        //the original request is immutable, so we need to clone it
        const modifiedRequest = req.clone({headers : req.headers.append('Auth', 'RafalPassword')}); //this will return a new headers object 
        return next.handle(modifiedRequest).pipe(tap(event => {
            if (event.type === HttpEventType.Response){
                console.log('response arrived, the body data is:')
                console.log(event.body);
            }
        })); //lets the request continue to go 
    }
}