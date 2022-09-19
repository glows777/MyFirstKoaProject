import { Context, Next } from "koa";
import jwt from "jsonwebtoken";

import userService from "../service/user.service";
import { userRegisterError, userChangePasswordError } from "../common/error.type";
import config from "../config/config.default";

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
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  public async login(ctx: Context) {
    const { user_name } = ctx.request.body;
    try {
      const res = await userService.getUserInfo({ user_name });
      const { password, ...payload } = res!;
      // const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1d" });
      ctx.body = {
        code: 0,
        message: `欢迎回来，${user_name}`,
        data: {
          token: jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1d" }), 
        },
      };
    } catch (error) {
      console.error(error, "登录出错");
    }
  }
  public async changePassword(ctx: Context, next: Next)   {
    const id = ctx.state.user.dataValues.id
    const password = ctx.request.body.password
    try {
      const res = await userService.updateById({id, password})
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改成功",
          data: {
            user_name: ctx.state.user.dataValues.user_name
          }
        }
      }
    } catch (error) {
      console.error("修改密码错误", error)
      ctx.app.emit('error', userChangePasswordError, ctx)
    }
  }
}

export default new UserController();
