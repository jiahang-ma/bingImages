class MenuListChildren {
  menuCode: string;
  menuId: number;
  menuType: number;
  name: string;
  num: number;
  parentId: number;
  url: string;
  status?: boolean;
  childMenu: any;
}

export class MenuList {
  menuCode: string;
  menuId: number;
  menuType: number;
  name: string;
  num: number;
  parentId: number;
  url: string;
  childMenu: Array<MenuListChildren>;
  icon?: string;
  isOpen?: boolean;
}

class User {
  createTime: number;
  job: string;
  mobile: string;
  status: number;
  token: string;
  userName: string;
  userNo: string;
  avatar: string;
}

export class SiderData {
  user?: User;
  menuList?: Array<MenuList>;
  buttonList?: Array<Button>;
}

export class LoginData {
  msg: string;
  result: string;
  data?: SiderData;
}

export class Button {
  childMenu: any;
  menuCode: string;
  menuId: number;
  menuType: number;
  name: string;
  num: number;
  parentId: number;
  url: string;
}
