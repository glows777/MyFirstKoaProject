import Router from "koa-router";
import {Context, Next} from 'koa'
import user from "../controller/user.controller";
import {
  userValidator,
  verifyUser,
  encryptPassword,
  verifyLogin,
} from "../middleware/user.middleware";
import {auth} from '../middleware/auth.middleware'
const router = new Router({
  prefix: "/users", // 配置前缀
});

// GET 配置完前缀后实际会处理的是这样的请求路径 /users/
// router.get('/', (ctx, next) => {
//     ctx.body = 'hello users'
// })

router.post(
  "/register",
  userValidator,
  verifyUser,
  encryptPassword,
  user.register
);
router.post("/login", userValidator, verifyLogin, user.login);
router.patch("/", auth, (ctx: Context, next: Next) => {
  console.log(ctx.state.user.dataValues);
  // todo 验证密码合法性，操作数据库修改密码
  ctx.body = "修改成功"
});

export default router;
