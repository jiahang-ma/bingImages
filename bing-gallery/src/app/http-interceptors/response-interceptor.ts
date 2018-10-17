import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log(`HttpResponse拦截器`);
            // console.log(event);
            // todo 根据项目实际需求,这里添加对于response的处理
          }
        },
        error => {
          console.error(error.message);
        }
      )
    );
  }

  /**
   *
   * @param result 此参数为后端HTTP返回的result
   */
  private handle(result: string) {
    switch (result) {
      case '900000001':
        console.log(1);
        break;
      case '9000002':
        console.log(2);
        break;
      default:
        console.log(3);
    }
  }
}
