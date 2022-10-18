/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-10 21:12:59
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 20:30:45
 * @FilePath: \8\src\common\error.type.ts
 * @Description: 统一错误处理类型
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import type { ResponseBody } from '../global'

const userFormateError: ResponseBody = {
  code: 10001,
  message: '用户名或密码为空',
  data: {},
}

const userAlreadyExited: ResponseBody = {
  code: 10002,
  message: '用户已经存在',
  data: {},
}

const userRegisterError: ResponseBody = {
  code: 10003,
  message: '用户注册失败',
  data: {},
}

const userNotExists: ResponseBody = {
  code: 10004,
  message: '用户不存在',
  data: {},
}

const userWrongPassword: ResponseBody = {
  code: 10005,
  message: '密码错误',
  data: {},
}
const userLoginError: ResponseBody = {
  code: 10006,
  message: '登录错误',
  data: {},
}
const userChangePasswordError: ResponseBody = {
  code: 10007,
  message: '修改密码失败',
  data: {},
}
const tokenExpiredError: ResponseBody = {
  code: 10101,
  message: 'token过期',
  data: {},
}
const jsonWebTokenError: ResponseBody = {
  code: 10102,
  message: 'token无效',
  data: {},
}
const hadNotAdminPermission: ResponseBody = {
  code: 10103,
  message: '无管理员权限',
  data: {},
}

const fileTypeError: ResponseBody = {
  code: 10201,
  message: '文件类型错误',
  data: {},
}
const goodsUploadParamsError: ResponseBody = {
  code: 10102,
  message: '商品参数错误',
  data: {},
}
const goodsUploadError: ResponseBody = {
  code: 10103,
  message: '商品上传出错',
  data: {},
}
export {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userNotExists,
  userWrongPassword,
  userLoginError,
  tokenExpiredError,
  jsonWebTokenError,
  userChangePasswordError,
  hadNotAdminPermission,
  fileTypeError,
  goodsUploadParamsError,
  goodsUploadError,
}
