export class SidebarItem {
  name: string;
  path: string;
  childMenu: Array<MenuListChildren>;
  icon?: string;
  isOpen?: boolean;
}

class MenuListChildren {
  name: string;
  path: string;
  status?: boolean;
  childMenu?: any;
}
