/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-10 21:12:59
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 20:45:32
 * @FilePath: \8\src\controller\goods.controller.ts
 * @Description: 商品模块controller层
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import path from 'path'
import fs from 'fs'
import type { Context, Next } from 'koa'
import { fileTypeError, goodsUploadError } from '../common/error.type'
import goodsService from '../service/goods.service'

const imageFileTypeError = Object.assign(fileTypeError, {
  data: { message: '图片类型应该是：[\'image/jpeg\', \'image/png\']' },
})

// function saveImage <T extends >(file: T) {

// }
class GoodsController {
  /**
   * @author: glows777
   * @description: 上传商品图片
   * @param {Context} ctx
   * @param {Next} _next
   * @return {*}
   */
  public async upload(ctx: Context, _next: Next) {
    // console.log(ctx.request.files?.file);
    // todo 分为多张图片以及一张处理
    // todo 找一个中间件校验参数
    const file = ctx.request.files?.file
    if (file) {
      const fileTypes = ['image/jpeg', 'image/png']
      if (!Array.isArray(file)) {
        if (!fileTypes.includes(file.mimetype!))
          return ctx.app.emit('error', imageFileTypeError, ctx)
        const reader = fs.createReadStream(file.filepath)
        const uploadFilePath = path.join(__dirname, '../upload/')
        const fileResource = uploadFilePath + file.newFilename
        const writer = fs.createWriteStream(fileResource)
        reader.pipe(writer)
        ctx.body = {
          code: 0,
          message: '上传成功',
          data: {
            goods_img: path.basename(file.filepath),
          },
        }
      }
    }
    else {
      return ctx.app.emit('error', {}, ctx)
    }
  }

  public async createGoods(ctx: Context) {
    try {
      const res = await goodsService.createGoods(ctx.request.body)
      ctx.response.body = {
        code: 0,
        message: '创建成功',
        data: {
          goods_name: res.goods_name,
        },
      }
    }
    catch (error) {
      console.error('创建商品错误： ', error)
      ctx.app.emit('error', goodsUploadError, ctx)
    }
  }
}
export default new GoodsController()
