import path from 'path'
import Koa from "koa";
import koaBody from "koa-body";
import KoaStatic from 'koa-static'

import errorHandler from "./errorHandler";
import routers from '../router/index'
const app: Koa = new Koa();
app.use(koaBody({
    multipart: true,
    formidable: {
        // todo 自己实现一个路径，不在这里指定
        // uploadDir: path.join(__dirname, '../upload'), 
        keepExtensions: true,
        maxFileSize: 200 * 1024 * 1024,
    }
}));

app.use(routers.routes())
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 统一进行错误处理
app.on("error", errorHandler)

export default app;

// ! 用这个filepath，而不是path