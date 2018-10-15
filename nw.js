let Service = require('node-windows').Service;
let path = require('path');

let svc = new Service({
  name: 'node_bing', //服务名称
  description: 'bing每日一图', //描述
  script: __filename //nodejs项目要启动的文件路径
});

svc.on('install', () => {
  svc.start();
});

svc.install();
