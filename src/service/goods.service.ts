/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-18 13:24:13
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 21:20:57
 * @FilePath: \8\src\service\goods.service.ts
 * @Description: 商品模块 Service层
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import Goods from '../model/goods.model'
interface GoodsType {
  goods_name: string
  goods_price: number
  goods_num: number
  goods_img: string
}
class GoodsService {
  /**
   * @author: glows777
   * @description: 创建商品
   * @param {GoodsType} goods
   * @return {*}
   */
  async createGoods(goods: GoodsType) {
    const res = Goods.create(goods)
    return res
  }
}

export default new GoodsService()

