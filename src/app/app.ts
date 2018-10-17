import { download } from './download/download';
const service = require('./service/app');


download(); // 下载图片开始
service(); // 后端图片服务启动
