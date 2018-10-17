import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class SkipService {

  constructor(private router: Router) {

  }

  path(path: string) {
    this.router.navigateByUrl(path)
      .then(res => {
        console.log(`路由跳转的then`);
        console.log(res);
      })
      .catch(err => {
        console.warn(`路由跳转的catch`);
        console.warn(err);
      });
  }

}
