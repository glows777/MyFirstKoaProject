import User from '../model/user.model'

interface Options {
  id?: string
  user_name?: string
  is_admin?: number
}
class UserService {
  public async createUser(user_name: string, password: string) {
    const res = await User.create({
      user_name,
      password,
    })
    // console.log(res);
    return res
  }

  public async getUserInfo(options: Options) {
    const whereOpt = {}
    options.id && Object.assign(whereOpt, { id: options.id })
    options.user_name
      && Object.assign(whereOpt, { user_name: options.user_name })
    options.is_admin && Object.assign(whereOpt, { is_admin: options.is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
      // raw: true
    })

    return res || null
  }

  public async updateById(
    options: Options & { id: string; password?: string },
  ): Promise<boolean> {
    // todo 验证重复密码
    const where = { id: options.id }
    const newUser = {}
    options.user_name
      && Object.assign(newUser, { user_name: options.user_name })
    options.is_admin && Object.assign(newUser, { is_admin: options.is_admin })
    options.password && Object.assign(newUser, { password: options.password })

    const res = await User.update(newUser, { where })
    // console.log(res);
    return res[0] > 0
  }
}

export default new UserService()
