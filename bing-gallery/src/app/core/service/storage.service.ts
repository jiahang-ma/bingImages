import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  getSession(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setSession(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getLocal(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clearLocal() {
    localStorage.clear();
  }

  clearSession() {
    sessionStorage.clear();
  }

  clearBoth() {
    this.clearSession();
    this.clearLocal();
  }

  // 删除某个localStrong键值对
  removeLocal(key: string) {
    localStorage.removeItem(key);
  }

  removeItem(key: string) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }
}
