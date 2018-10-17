import {Injectable} from '@angular/core';
import {StorageService} from '@storage';

import {User} from '@class';

import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
//  todo 这里未来应该需要支持添加更多全局同步的变量,可以参考angular源码实现一个register注册器机制
export class UserService {

  private _user = this.getUserByStorage();

  private get user() {
    return this._user;
  }

  private set user(value) {
    throw new Error('不可用直接修改user,请使用setValue方法');
  }

  constructor(private storageService: StorageService) {
  }


  get() {
    return this.user;
  }

  /**
   * 如果需要修改user中的数据,请使用此方法,此方法会同步修改localstorage内储存的user数值
   * @param key user内的key名称
   * @param value key对应的value
   */
  setValue(key: string, value: string) {
    if (this._user) {
      try {
        this._user[key] = value;
        this.set(this._user);
      } catch (e) {
        throw new Error(`当前的user内并没有${key},请检查`);
      }
    } else {
      throw new Error('user不存在');
    }
  }

  getValue(key: string) {
    if (this._user) {
      try {
        return this._user[key];
      } catch (e) {
        throw new Error(`当前的user内并没有${key},请检查`);
      }
    } else {
      throw new Error('user不存在');
    }
  }

  set(user: User): boolean {
    if (_.isObject(user)) {
      this.storageService.setLocal('user', user);
      if (_.isEqual(user, this.getUserByStorage())) {
        this._user = user;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private getUserByStorage() {
    const user = this.storageService.getLocal('user');
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
