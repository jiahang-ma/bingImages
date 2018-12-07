import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()

export class ConfigService {
    hostname = 'http://192.168.1.199:8888';
    imgHostname = 'http://192.168.1.199:8081';
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
        this.hostname = 'http://192.168.1.199:8888';
        this.imgHostname = 'http://192.168.1.199:8081';
        this.shareHostname = ''; // 这个应该使用当前项目IP地址
    }

}
