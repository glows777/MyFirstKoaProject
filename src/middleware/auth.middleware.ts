import jwt from 'jsonwebtoken'
import type { MiddlewareFunc } from '../global'
import config from '../config/config.default'
import {
  hadNotAdminPermission,
  jsonWebTokenError,
  tokenExpiredError,
} from '../common/error.type'

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

export const hasAdminPermission: MiddlewareFunc = async (ctx, next) => {
  const { is_admin } = ctx.state.user.dataValues

  if (!is_admin) {
    console.error('无管理员权限', ctx.state.user.dataValues)
    return ctx.app.emit('error', hadNotAdminPermission, ctx)
  }
  await next()
}
