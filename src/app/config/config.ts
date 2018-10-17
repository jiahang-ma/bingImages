import * as path from 'path';

export const projectBaseUrl = path.join(__dirname, '../../../');
export const logPath: string = projectBaseUrl + 'log'; // 日志文件夹地址
export const logTextPath: string = projectBaseUrl + 'log/downloadTime.txt'; // 下载成功以后日志保存地址
export const picSavePath: string = projectBaseUrl + 'images';// 下载图片保存地址
export const bingHostname: string = `http://www.bing.com`; // bing站点地址
