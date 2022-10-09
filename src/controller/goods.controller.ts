import path from "path";
import fs from "fs";
import { Context, Next } from "koa";
import { fileTypeError } from "../common/error.type";
const imageFileTypeError = Object.assign(fileTypeError, {
  data: { message: "图片类型应该是：['image/jpeg', 'image/png']" },
});

function saveImage <T extends >(file: T) {

}
class GoodsController {
  public async upload(ctx: Context, next: Next) {
    // console.log(ctx.request.files?.file);
    // todo 分为多张图片以及一张处理
    // todo 找一个中间件校验参数
    const file = ctx.request.files?.file;
    if (file) {
      const fileTypes = ["image/jpeg", "image/png"];
      if (!Array.isArray(file)) {
        if (!fileTypes.includes(file.mimetype!))
          return ctx.app.emit("error", imageFileTypeError, ctx);
        const reader = fs.createReadStream(file.filepath);
        const uploadFilePath = path.join(__dirname, "../upload/");
        const fileResource = uploadFilePath + file.newFilename;
        const writer = fs.createWriteStream(fileResource);
        reader.pipe(writer);
        ctx.body = {
          code: 0,
          message: "上传成功",
          data: {
            goods_img: path.basename(file.filepath),
          },
        };
      } else {
        return ctx.app.emit("error", {}, ctx);
      }
    }
  }
}
export default new GoodsController();
