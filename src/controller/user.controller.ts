import { Context, Next } from "koa";
import userService from "../service/user.service";
import {userRegisterError} from '../common/error.type'

class UserController {
  public async register(ctx: Context, next: Next) {
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    try {
      const res = await userService.createUser(user_name, password);

      // @ts-ignore
      // console.log(res.dataValues);
      ctx.body = {
        code: 0,
        message: "注册成功",
        data: {
          id: res.getDataValue("id"),
          user_name: res.getDataValue("user_name"),
        },
      };
    } catch (err) {
      console.error(err, "注册出错");
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  public async login(ctx: Context) {
    ctx.body = "用户登录成功";
  }
}

export default new UserController();
