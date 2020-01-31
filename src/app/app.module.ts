import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule], //have to add the HTTP client module
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass : AuthInterceptorService, 
    multi: true //so that there can be multiple interceptors of the request 
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
