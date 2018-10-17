import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()

export class ConfigService {
    hostname = 'http://192.168.1.199:8081';
    imgHostname = '';
    shareHostname = ''; // 这个应该使用当前项目IP地址

    constructor() {
        if (environment.production) {
            this.setProductionConfig();
        }
    }

    /**
     * 此方法禁止修改
     */
    private setProductionConfig() {
        this.hostname = 'http://192.168.1.199:8081';
        this.imgHostname = '';
        this.shareHostname = ''; // 这个应该使用当前项目IP地址
    }

}
