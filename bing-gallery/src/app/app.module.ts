import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Router} from '@angular/router'; // 用于打印现在的路由结构,检查路由设置是否符合预期

// http拦截器
import {httpInterceptorProviders} from './http-interceptors';
// 判断是否是生产模式
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
// 主路由模块
import {AppRoutingModule} from './app-routing.module';
// 引入core模块
import {CoreModule} from '@core/core.module';
// 引入config模块
import {ConfigModule} from './config/config.module';
// ng-zorro需要的依赖
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// 注意: imports AppRoutingModule必须在最后一个(会影响路由结构的顺序)
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfigModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // 如果当前环境是生产环境,那么就不在控制台打印路由结构
    if (!environment.production) {
      console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
  }
}
