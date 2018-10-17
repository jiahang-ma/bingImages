import {NgModule} from '@angular/core';

import {SkipService} from '@skip';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '@http';
import {StorageService} from '@storage';
import {AuthRouterService} from './service/auth-router.service';
import {SiderDataService} from './service/sider-data.service';
import {SharedModule} from '@shared';
import {PerformanceMonitoringService} from './service/performance-monitoring.service';

@NgModule({
  imports: [HttpClientModule, SharedModule],
  declarations: [],
  providers: [SkipService, HttpService, StorageService, AuthRouterService, SiderDataService, PerformanceMonitoringService]
})
export class CoreModule {
}
