import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptorService implements HttpInterceptor  {
  baseUrl="https://localhost:44317/api/";
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: `${this.baseUrl}${req.url}` });
    return next.handle(req);
  }
}
