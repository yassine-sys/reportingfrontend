import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  // Define the URLs that should be excluded from the loader
  private excludedUrls = [
    '/login/rsrReport',
    '/operators/dest',
    '/operators/interco',
    '/login/reponly/',
    '/login/repfiltreonly/',
    '/login/rep/',
  ];

  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL matches any of the excluded URLs
    if (this.excludedUrls.some((url) => req.url.includes(url))) {
      return next.handle(req);
    }

    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
