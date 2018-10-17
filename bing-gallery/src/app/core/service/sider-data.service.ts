import {Injectable} from '@angular/core';

import {StorageService} from '@storage';
import {SiderData} from '../../login/login';

@Injectable()
export class SiderDataService {

  constructor(private storageService: StorageService) {
  }

  /**
   *
   * @returns {SiderData} 返回的已经是对象了
   */

  getSiderData(): SiderData {
    const siderData = this.storageService.getLocal('siderData');
    if (!siderData) {
      console.warn(`sider-data.service.ts文件内getSiderData方法没有获取到数据,可能的原因:\n 在登陆之前获取siderData的数据,此时没有登陆,浏览器并没有缓存到`);
      return null;
    }
    return siderData;
  }

  clearSiderData() {
    if (this.getSiderData()) {
      this.storageService.removeItem('siderData');
    }
  }

}
