import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {SiderDataService} from './sider-data.service';

@Injectable()
export class AuthRouterService implements CanActivate {

  siderData = this.siderDataService.getSiderData();
  path: string;

  constructor(private siderDataService: SiderDataService) {
  }

  /**
   * 如果menuLists不存在,那么说明没有登陆,直接禁止访问.存在的话 判断当前路由是否匹配后端回传的menu信息,防止用户访问他权限以外的页面
   * @param routerInfo  路由跳转时候注入的参数ActivatedRouteSnapshot,有所有目前路由状态的信息
   * @returns {boolean}
   */
  canActivate(routerInfo) {
    if (!this.siderData) {
      return false;
    }

    let status = false;
    try {
      this.path = routerInfo._routerState.url;
    } catch (err) {
      console.log(`auth-login.service.ts页面获取路由path错误,可能ActivatedRouteSnapshot API已经改变,请检查`);
      console.warn(err);
      return false;
    }
    this.siderData.menuList.forEach(menu => {
      menu.childMenu.forEach(children => {
        if (children.url === this.path) {
          status = true;
          return;
        }
      });
    });
    return status;
  }
}
