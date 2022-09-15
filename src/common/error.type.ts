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
export { userFormateError, userAlreadyExited, userRegisterError };
