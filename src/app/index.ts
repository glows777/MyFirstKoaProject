import Koa from "koa";
import koaBody from "koa-body";
// import userRouter from "../router/user.route";
// import goodsRouter from '../router/goods.route'
import errorHandler from "./errorHandler";
import routers from '../router/index'
const app: Koa = new Koa();
app.use(koaBody());

// app.use(userRouter.routes());
// app.use(goodsRouter.routes())

app.use(routers.routes())

// 统一进行错误处理
app.on("error", errorHandler)

export default app;
