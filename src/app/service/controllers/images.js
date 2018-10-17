let imagesData = require('../database/imagesData');

// todo  images接口服务需要分页功能,暂时只需要1920*1080大小的图片即可

let images = async (ctx, next) => {
    // ctx.request 接到的HTTP请求头相关信息
    console.log(ctx.request.body);
    console.log(ctx.request.query);

    ctx.response.body = imagesData.data; // 需要给前端返回的数据
}


// 注意GET或者其他方法必须大写,并且后面必须有一个空格
module.exports = {
    'GET /images': images
}
