import User from "../model/user.model";

class UserService {
  public async createUser(user_name: string, password: string) {
    const res = await User.create({
      user_name,
      password,
    });
    // console.log(res);
    return res;
  }

  public async getUserInfo(options: {id?: string, user_name?: string, is_admin?: number}) {
    let whereOpt = {};
    options.id && Object.assign(whereOpt, {id: options.id})
    options.user_name && Object.assign(whereOpt, {user_name: options.user_name})
    options.is_admin && Object.assign(whereOpt, {is_admin: options.is_admin})
    
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
      raw: true
    })
    
    return res ? res : null
  }
}

export default new UserService();
