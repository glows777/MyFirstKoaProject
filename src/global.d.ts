import {Context, Next} from 'koa'
interface ResponseBody {
    code: number,
    message: string
    data: {}
}

type MiddlewareFunc = (ctx: Context, next: Next) => any

