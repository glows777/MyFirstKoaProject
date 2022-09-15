import app from './app/index'

import config from "./config/config.default.js";

const port: string = config.APP_PORT!;
app.listen(port, () => {
  console.log(`success starting server`);
  console.log(`local: http://127.0.0.1:${port}`);
});



// app.use((ctx: Koa.DefaultContext, next: Koa.Next) => {
//   console.log(ctx.request.body);
//   console.log("hello");

//   ctx.body = "hello world！";
//   next();
//   console.log("world");
// });
// app.use((ctx: Koa.DefaultContext) => {
//   console.log("111");
// });··


