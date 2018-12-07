const fs = require('fs');
const path = require('path');

const projectBaseUrl = path.join(__dirname, '../../../..');
const targetImgPath = projectBaseUrl + '/images';

const imgs = [];


fs.readdirSync(targetImgPath).filter((f) => {
    return f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg');
}).forEach((f) => {
    imgs.push(f);
});


const data = {
    "msg": "success",
    "result": "00000000",
    "data": imgs // 自定义需要的数据

}

module.exports = {
    data
}; // 相当于es6的 export node.js目前只支持此种
