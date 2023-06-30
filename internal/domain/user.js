const types = require("@server/lib/types");

const domains = {
  errEmailAlreadyExist: "Email already exists.",
  msgUserRegisterSuccess: "Register successfully.",

  userIsNotFound: "User is not found.",
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
