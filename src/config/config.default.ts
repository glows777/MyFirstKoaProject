import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.APP_PORT);
const config = {
    APP_PORT: process.env.APP_PORT || '3000',
    MYSQL_HOME: process.env.MYSQL_HOME || 'localhost',
    MYSQL_PORT: parseInt(process.env.MYSQL_PORT!) || 3306,
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PWD: process.env.MYSQL_PWD || '676727',
    MYSQL_DB: process.env.MYSQL_DB || 'first_node_project',
}

export default config;