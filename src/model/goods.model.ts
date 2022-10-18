/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-18 13:27:04
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 13:57:38
 * @FilePath: \8\src\model\goods.model.ts
 * @Description: 用户表
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import type { InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import seq from '../db/seq'

class Goods extends Model<InferAttributes<Goods>, InferCreationAttributes<Goods>> {
  declare goods_name: string
  declare goods_price: number
  declare goods_num: number
  declare goods_img: string
}
Goods.init({
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称',
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量',
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片的url',
  },
}, {
  tableName: 'zd_goods',
  sequelize: seq,
})

// Goods.sync({ force: true })

export default Goods
