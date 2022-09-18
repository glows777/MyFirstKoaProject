import { ResponseBody } from "../global";

const userFormateError: ResponseBody = {
  code: 10001,
  message: "用户名或密码为空",
  data: {},
};

const userAlreadyExited: ResponseBody = {
  code: 10002,
  message: "用户已经存在",
  data: {},
};

const userRegisterError: ResponseBody = {
  code: 10003,
  message: "用户注册失败",
  data: {},
};

const userNotExists: ResponseBody = {
  code: 10004,
  message: "用户不存在",
  data: {}
}

const userWrongPassword: ResponseBody = {
  code: 10005, 
  message: "密码错误",
  data: {}
}
const userLoginError: ResponseBody = {
  code: 10006,
  message: "登录错误",
  data: {}
}
const tokenExpiredError: ResponseBody = {
  code: 10101,
  message: "token过期",
  data: {}
}
const jsonWebTokenError: ResponseBody = {
  code: 10102,
  message: "token无效",
  data: {}
}
export { userFormateError, userAlreadyExited, userRegisterError, userNotExists, userWrongPassword, userLoginError, tokenExpiredError, jsonWebTokenError };
