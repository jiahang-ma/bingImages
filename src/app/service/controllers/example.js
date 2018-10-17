let tableData = require('../database/exampleData');

let example = async (ctx, next) => {
    // ctx.request 接到的HTTP请求头相关信息
    console.log(ctx.request.body);
    console.log(ctx.request.query);

    ctx.response.body = tableData.data; // 需要给前端返回的数据
}



// 注意GET或者其他方法必须大写,并且后面必须有一个空格
module.exports = {
    'GET /example': example
}

// 此API的访问地址就是 http://localhost:8080/example