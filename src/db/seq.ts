import { Sequelize } from 'sequelize'
import config from '../config/config.default'

const seq = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PWD, {
  host: config.MYSQL_HOME,
  dialect: 'mysql',
  port: config.MYSQL_PORT,
})

// seq
//   .authenticate()
//   .then(() => {
//     console.log("success!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default seq
