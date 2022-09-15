import Koa from "koa";
import koaBody from "koa-body";
import userRouter from "../router/user.route";
import errorHandler from "./errorHandler";

const app: Koa = new Koa();
app.use(koaBody());

app.use(userRouter.routes());

// 统一进行错误处理
app.on("error", errorHandler)

export default app;
