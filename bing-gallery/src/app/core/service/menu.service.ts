import {Injectable} from '@angular/core';
import {StorageService} from '@storage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private key = 'menu';

  constructor(private storageService: StorageService) {
  }

  getMenu(): Array<any> {
    const menu = this.storageService.getLocal(this.key);
    return menu || '';
  }

  setMenu(value: Array<any>): boolean {
    const menu = this.storageService.getLocal(this.key);
    if (_.isArray(value)) {
      this.storageService.setLocal(this.key, menu);
      return _.isEqual(menu, this.getMenu());
    } else {
      return false;
    }
  }
}
