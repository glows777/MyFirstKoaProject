import { DataTypes, Model } from 'sequelize'
import seq from '../db/seq'

// 创建模型
class User extends Model {
  declare user_name: string
  declare password: string
  declare is_admin: 0 | 1
}
User.init(
  {
    // id会自动创建管理
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员，0(默认)： 不是， 1： 是',
    },
  },
  {
    tableName: 'zd_users',
    sequelize: seq,
  },
)

// const User = seq.define('zd_user', {
//     // id会自动创建管理

//     user_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         comment: '用户名，唯一'
//     },
//     password: {
//         type: DataTypes.CHAR(64),
//         allowNull: false,
//         comment: '密码'
//     },
//     is_admin: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: 0,
//         comment: '是否为管理员，0(默认)： 不是， 1： 是'
//     }
// })

// 强制同步数据库
// User.sync({force: true})

export default User
