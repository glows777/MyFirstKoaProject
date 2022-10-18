/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2022-10-10 21:12:59
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2022-10-18 14:14:36
 * @FilePath: \8\src\router\goods.route.ts
 * @Description: 商品路由
 *
 * Copyright (c) 2022 by glows777 1914426389@qq.com, All Rights Reserved.
 */
import Router from 'koa-router'
import { auth, hasAdminPermission } from '../middleware/auth.middleware'
import { validator } from '../middleware/goods.middleware'
import goods from '../controller/goods.controller'
const router = new Router({
  prefix: '/goods',
})

router.post('/upload', auth, hasAdminPermission, goods.upload)

router.post('/postGoods', auth, hasAdminPermission, validator, goods.createGoods)
export default router
// const aaa = {
//     b: 1
// }
// export default aaa
