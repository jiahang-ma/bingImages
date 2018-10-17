const Koa = require('koa');

const cors = require('koa2-cors');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();


module.exports = function () {
    app.use(cors({
        origin: function (ctx) {
            return "*";
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Platform'],
    }));

    app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
        await next();
    });

    app.use(async (ctx, next) => {
        const start = new Date().getTime(); // 当前时间
        await next(); // 调用下一个middleware
        const ms = new Date().getTime() - start; // 耗费时间
        console.log(`Time: ${ms}ms`); // 打印耗费时间
    });

    app.use(bodyParser());
    app.use(controller());

    app.listen(8888);
    console.log('app started at port 8888');
};
