import * as fs from "fs";
import * as http from "http";
import * as request from "request";

import log from '../utils/console';
import { projectBaseUrl } from '../config/config';

const imgIndex: number = 7; // 必应每日一图只有7张好坑
const logPath: string = projectBaseUrl+'log';
const logTextPath: string = projectBaseUrl + 'log/downloadTime.txt';
const picSavePath: string = projectBaseUrl+'images'; // todo 后续把这些常量放到config文件下
const bingHostname: string = `http://www.bing.com`; // bing站点地址

let count: number = 0;

function doCheck() {
  if (!fs.existsSync(logPath)) { // 如果log文件夹不存在 那么创建它 // 检查目录会导致文件夹至少写的权限被锁死 导致后面写图片失败 所以要放到前面
    fs.mkdirSync(logPath);  // 后期这种检查文件可以创建一个 init.ts 单独文件里面去执行
  }

  if (!fs.existsSync(picSavePath)) {
    fs.mkdirSync(picSavePath);
  }

  try {
    fs.statSync(logTextPath);
  } catch (e) {
    const now = new Date().getTime();
    const params = 1000 * 60 * 60 * 24;
    const timeTxt = now - params;
    fs.writeFile(logTextPath, new Date(timeTxt).toLocaleString(), (err) => {  // todo 这里创建应该用同步方法
      if (err) {
        console.log(`新建downloadTime.txt失败`);
        console.log(err);
      }
    })
  }
}


function fetchBingImages() {


  for (let i = 0; i <= imgIndex; i++) {

    let url_getImgUrl: string = `http://www.bing.com/HPImageArchive.aspx?format=js&idx=${i}&n=1&mkt=en-US`;

    request(url_getImgUrl, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let data = JSON.parse(body);
        let imgUrl = data.images[0].url;
        let imgDescription: string = data.images[0].copyright;
        let index = imgDescription.indexOf(" (");
        let imgName = imgDescription.substring(0, index);
        log(`${i}.${imgName}`);
        http.get(bingHostname + imgUrl, (res) => {
          let imgData = "";

          res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开

          res.on("data", (chunk) => {
            imgData += chunk;
          });

          res.on("end", () => {  // todo 这里保存完图片以后需要把图片保存路径地址入库,还有图片的简介等东西一并入库
            fs.writeFile(`${picSavePath}/${imgName}.jpg`, imgData, "binary", (err) => {
              if (err) {
                log(`${i}-写入图片错误`);
                log(err);
                log(`${bingHostname}${imgUrl}`);
              }
              else {

                log(`${i}-写入图片成功:${bingHostname}${imgUrl}`);
                count += 1;
                if (count === imgIndex + 1) {

                  const lastDownloadTime = fs.readFileSync(logTextPath, 'utf8');

                  if (lastDownloadTime) {
                    log('\n上次下载时间是:' + lastDownloadTime + '\n');
                  } else {
                    log(`\n没有上次下载时间\n`);
                  }

                  const currentTime = new Date().toLocaleString();
                  fs.writeFile(logTextPath, currentTime, (err) => {
                    if (err) {
                      log(`写入下载时间错误`);
                      log(err);
                    }
                  });
                  log(`\n图片写入已经全部完成`);
                  log(`图片保存路经是${picSavePath}`);
                  log(`图片下载时间更新为${currentTime}`);
                }
              }

            });
          });
        });
      }
      else {
        log(`连接出错`);
      }
    })

  }
}


export function download() {
  doCheck();

  const lastDownloadTimeText = fs.readFileSync(logTextPath, 'utf8');
  const lastDownloadTime = new Date(new Date(lastDownloadTimeText).setHours(0, 0, 0, 0)).getTime();
  const now = new Date().getTime();
  const params = 1000 * 60 * 60 * 24;

  if ((lastDownloadTime + params) < now) {
    fetchBingImages();
  }

}
