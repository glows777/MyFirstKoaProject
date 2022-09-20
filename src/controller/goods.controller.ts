import {Context, Next} from 'koa'

class GoodsController {
    public async upload(ctx: Context, next: Next) {
        ctx.body = "上传成功"
        
    }
}
export default new GoodsController()