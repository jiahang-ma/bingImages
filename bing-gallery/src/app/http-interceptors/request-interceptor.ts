import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {TokenService} from '@token';

import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';

@Injectable()

export class RequestInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private configService: ConfigService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let type = '';
    req.headers.keys().forEach(key => {
      if (key === 'X-Requested-With') {
        type = 'upload';
      }
    });
    switch (type) {
      case 'upload':
        return next.handle(this.uploadHeaders(req));
      default:
        return next.handle(this.defaultHeaders(req));
    }
  }

  private uploadHeaders(req: HttpRequest<any>) {
    return req.clone({
      url: this.getHostname() + req.url,
      setHeaders: {
        'Authorization': this.getToken(),
        'Platform': 'management'
      }
    });
  }

  private defaultHeaders(req: HttpRequest<any>) {
    return req.clone({
      url: this.getHostname() + req.url,
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': this.getToken(),
        'Platform': 'management'
      }
    });
  }

  private getToken(): string {
    return this.tokenService.getToken();
  }


  /**
   * 目前全局配置参数依然从config里面拿,后期通过其他方式从后端获取这种全局配置信息
   */
  private getHostname(): string {
    return this.configService.hostname;
  }

}

