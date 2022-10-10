import fs from 'fs'
import Router from 'koa-router'

const files = fs.readdirSync(__dirname).filter(file => !file.includes('index'))
const routers = new Router()
files.forEach((file) => {
  const fileName = `./${file}`

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const router = require(fileName)

  // * 这里用router.default，是因为导出是用默认模块导出
  routers.use(router.default.routes())
})
export default routers
