import bcrypt from 'bcryptjs'

import userService from '../service/user.service'
import {
  userAlreadyExited,
  userFormateError,
  userLoginError,
  userNotExists,
  userRegisterError,
  userWrongPassword,
} from '../common/error.type'
import type { MiddlewareFunc } from '../global'

// type MiddlewareFunc = (ctx: Context, next: Next) => any;

/**
 * @author glows777
 * @decs 验证请求账号密码的合法性
 * @param ctx
 * @param next
 * @returns
 */
export const userValidator: MiddlewareFunc = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

/**
 * @author glows777
 * @decs 判断注册请求的账号密码的合理性
 * @param ctx Context
 * @param next Next
 * @returns
 */
export const verifyUser: MiddlewareFunc = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await userService.getUserInfo({ user_name })
    if (res) {
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  }
  catch (err) {
    ctx.app.emit('error', userRegisterError, ctx)
    console.error('注册出错', err)
    return
  }
  await next()
}

/**
 * @author glows777
 * @desc 加密密码
 * @param ctx Context
 * @param next Next
 */
export const encryptPassword: MiddlewareFunc = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

/**
 * @author glows777
 * @desc 验证当前登录用户是否存在
 * @param ctx
 * @param next
 * @returns
 */
export const verifyLogin: MiddlewareFunc = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  try {
    const res = await userService.getUserInfo({ user_name })
    if (!res) {
      ctx.app.emit('error', userNotExists, ctx)
      console.error('用户名不存在', { user_name })
      return
    }
    // console.log(res.getDataValue("password"));

    if (!bcrypt.compareSync(password, res.getDataValue('password'))) {
      ctx.app.emit('error', userWrongPassword, ctx)
      return
    }
  }
  catch (error) {
    console.error(error)
    ctx.request.body('error', userLoginError, ctx)
    return
  }
  await next()
}
