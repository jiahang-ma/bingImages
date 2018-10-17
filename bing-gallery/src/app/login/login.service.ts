import {Injectable} from '@angular/core';
import {HttpService} from '@core/service/http.service';
import {LoginData} from './login';
import {StorageService} from '@storage';

class AccountInfo {
  mobile: string;
  passWord: string;
}

@Injectable()
export class LoginService {

  constructor(private http: HttpService,
              private storageService: StorageService) {

  }

  doLogin(mobile, passWord): Promise<LoginData> {
    return this.http.post('/login', {mobile, passWord});
  }

  saveAccountInfo(accountInfo: AccountInfo) {
    this.storageService.setLocal('accountInfo', accountInfo);
  }

  getAccountInfo(): AccountInfo {
    return this.storageService.getLocal('accountInfo');
  }

  deleteAccountInfo() {
    this.storageService.removeItem('accountInfo');
  }

}
