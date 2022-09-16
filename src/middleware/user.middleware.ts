import bcrypt from "bcryptjs";
import { Context, Next } from "koa";

import userService from "../service/user.service";
import {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userNotExists,
  userWrongPassword,
  userLoginError
} from "../common/error.type";

type UserMiddlewareFunc = (ctx: Context, next: Next) => any;

/**
 * @author glows777
 * @decs 验证请求账号密码的合法性
 * @param ctx
 * @param next
 * @returns
 */
export const userValidator: UserMiddlewareFunc = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

/**
 * @author glows777
 * @decs 判断注册请求的账号密码的合理性
 * @param ctx Context
 * @param next Next
 * @returns
 */
export const verifyUser: UserMiddlewareFunc = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await userService.getUserInfo({ user_name });
    if (res) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    ctx.app.emit("error", userRegisterError, ctx);
    console.error("注册出错", err);
    return;
  }
  await next();
};

/**
 * @author glows777
 * @desc 加密密码
 * @param ctx Context
 * @param next Next
 */
export const encryptPassword: UserMiddlewareFunc = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

/**
 * @author glows777
 * @desc 验证登录请求的合法性以及用户是否存在 
 * @param ctx 
 * @param next 
 * @returns 
 */
export const verifyLogin: UserMiddlewareFunc = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await userService.getUserInfo({ user_name });
    if (!res) {
      ctx.app.emit("error", userNotExists, ctx);
      console.error("用户名不存在", { user_name });
      return;
    }
    // console.log(res.getDataValue("password"));
    
    if (!bcrypt.compareSync(password, res.getDataValue('password'))) {
      ctx.app.emit('error', userWrongPassword, ctx)
      return
    }
  } catch (error) {
    console.error(error)
    ctx.request.body("error", userLoginError, ctx)
    return
  }
  await next()
};
