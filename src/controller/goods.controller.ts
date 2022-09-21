import {Context, Next} from 'koa'

class GoodsController {
    public async upload(ctx: Context, next: Next) {
        console.log(ctx.request.files);
        
        ctx.body = "上传成功"
    }
}
export default new GoodsController()
