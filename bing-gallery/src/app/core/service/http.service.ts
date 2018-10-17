import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config/config.service';
import {TokenService} from '@token';
import {NzMessageService} from 'ng-zorro-antd';
import {CustomRequestParams} from '@class';
import {SiderDataService} from './sider-data.service';
import {SkipService} from '@skip';

@Injectable()

export class HttpService {


  constructor(private http: HttpClient,
              private httpConfigService: ConfigService,
              private siderDataService: SiderDataService,
              private tokenService: TokenService,
              private message: NzMessageService,
              private routingJumpService: SkipService
  ) {
  }

  get(path: string, params?: CustomRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(path, {'params': params}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.warn('err');
          console.warn(err);
          reject(err);
        });
    });
  }

  delete(path: string, params?: CustomRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(path, {'params': params}).toPromise()
        .then(res => {
          resolve(res);

        })
        .catch(err => {
          console.warn('err');
          console.warn(err);
          reject(err);
        });
    });
  }

  post(path: string, body: any, params?: CustomRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(path, body, {'params': params}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.warn('err');
          console.warn(err);
          reject(err);
        });
    });
  }

  put(path: string, body?: any, params?: CustomRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(path, body, {'params': params}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.warn('err');
          console.warn(err);
          reject(err);
        });
    });
  }

  /**
   * 目前只有网络问题导致的HTTP请求无法发出才会走catch
   */
  private handleError() {
    this.siderDataService.clearSiderData();
    this.routingJumpService.path('/login');
    this.message.warning('您的登陆信息已经失效,请重新登陆!');
  }
}
