import Router from 'koa-router'
import { auth, hasAdminPermission } from '../middleware/auth.middleware'
import goods from '../controller/goods.controller'
const router = new Router({
  prefix: '/goods',
})

router.post('/upload', auth, hasAdminPermission, goods.upload)
export default router
// const aaa = {
//     b: 1
// }
// export default aaa
