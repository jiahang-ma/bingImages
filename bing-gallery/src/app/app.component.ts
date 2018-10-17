import {Component, OnInit, OnDestroy} from '@angular/core';

import {PerformanceMonitoringService} from '@core/service/performance-monitoring.service';

@Component({
  selector: 'kylin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private PMService: PerformanceMonitoringService) {
    // this.PMService.init();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.PMService.destroy();
  }
}
