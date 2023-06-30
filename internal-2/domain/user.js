const types = require("@server/lib/types");

const domains = {
  errEmailAlreadyExist: "Email already exists.",
  msgUserRegisterSuccess: "Register successfully.",
};

const userRegisterRequest = {
  id: {
    type: types.STRING,
    validate: ["required"],
  },
  email: {
    type: types.STRING,
    validate: ["required"],
  },
};

module.exports = { ...domains, userRegisterRequest };
