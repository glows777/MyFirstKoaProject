/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-12 21:34:00
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 21:18:18
 * @FilePath: \8\src\middleware\goods.middleware.ts
 * @Description:
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import Joi from 'joi'
import type { MiddlewareFunc } from '../global'
import { goodsUploadParamsError } from '../common/error.type'

const schema = Joi.object({
  goods_name: Joi.string().required(),
  goods_price: Joi.number().required(),
  goods_num: Joi.number().min(1).max(99999).required(),
  goods_img: Joi.string().required(),
})
/**
 * @author: glows777
 * @description: 参数验证
 * @param {*} ctx
 * @param {*} next
 * @return {*}
 */
export const validator: MiddlewareFunc = async (ctx, next) => {
  try {
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      console.error('上传商品参数错误： ', error)
      Object.assign(goodsUploadParamsError, { data: { msg: error.details.map(item => item.message) } })
      return ctx.app.emit('error', goodsUploadParamsError, ctx)
    }
    await next()
  }
  catch (error) {
    console.error('商品校验出错： ', error)
  }
}

// todo 校验商品是否存在于数据库？
