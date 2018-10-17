import {Injectable} from '@angular/core';

import {StorageService} from '@storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storageService: StorageService) {
  }

  /**
   *  如果从缓存中拿到token,那么就返回token,如果缓存中没有token,那么返回一个空字符串
   */
  getToken(): string {
    const token = this.storageService.getLocal('token');
    return token || '';
  }


  /**
   *
   * @param token  正确缓存了token返回true,
   */
  setToken(token: string): boolean {
    if (token) {
      this.storageService.setLocal('token', token);
      return this.getToken() === token;
    } else {
      return false;
    }
  }
}
