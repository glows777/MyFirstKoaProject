/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-10 21:12:59
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 21:19:35
 * @FilePath: \8\src\middleware\auth.middleware.ts
 * @Description: 认证中间件
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import jwt from 'jsonwebtoken'
import type { MiddlewareFunc } from '../global'
import config from '../config/config.default'
import {
  hadNotAdminPermission,
  jsonWebTokenError,
  tokenExpiredError,
} from '../common/error.type'
/**
 * @author: glows777
 * @description: 验证token
 * @param {*} ctx
 * @param {*} next
 * @return {*}
 */
export const auth: MiddlewareFunc = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization?.replace('Bearer ', '') || ''
  // console.log(token);

  try {
    const user = jwt.verify(token, config.JWT_SECRET)
    ctx.state.user = user
  }
  catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token过期', error)
        ctx.app.emit('error', tokenExpiredError, ctx)
        return
      case 'JsonWebTokenError':
        console.error('token无效', error)
        ctx.app.emit('error', jsonWebTokenError, ctx)
        return
    }
  }
  await next()
}
/**
 * @author: glows777
 * @description: 检查是否有管理员权限
 * @param {*} ctx
 * @param {*} next
 * @return {*}
 */
export const hasAdminPermission: MiddlewareFunc = async (ctx, next) => {
  const { is_admin } = ctx.state.user.dataValues

  if (!is_admin) {
    console.error('无管理员权限', ctx.state.user.dataValues)
    return ctx.app.emit('error', hadNotAdminPermission, ctx)
  }
  await next()
}
