import { download } from './download/upload';
const service = require('./service/app');


download(); // 下载图片开始
service(); // 后端图片服务启动

// todo 添加一个service提供图片接口
