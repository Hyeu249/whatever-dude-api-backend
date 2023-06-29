const { isEmail } = require("validator");

const domain = require("@server/internal/domain");
const help = require("@server/lib/help");

class Validator {
  #structKeys = [];
  #error = null;
  constructor(req, struct) {
    this.req = req;
    this.struct = struct;
    this.result = {};

    //for private
    this.#structKeys = Object.keys(struct);
  }

  static Bind(req, struct) {
    const validator = new Validator(req, struct);
    return validator;
  }
  ValidateStruct() {
    const req = this.req;
    const struct = this.struct;
    const structKeys = this.#structKeys;
    try {
      for (const key of structKeys) {
        const faulty = ["", 0, undefined, null, NaN];
        const isValue = !faulty.includes(req[key]);
        //check type of value
        if (req[key] !== undefined) if (!struct[key].type.includes(typeof req[key])) throw new Error(domain.MalformedJSONErrResMsg);

        //validate required
        if (struct[key].validate.find((v) => v.includes("required"))) {
          if (!isValue) throw new Error(domain.validationFailureErrResMsg);
        }

        //validate gte
        if (struct[key].validate.find((v) => v.includes("gte"))) {
          const gte = struct[key].validate.find((v) => v.includes("gte"));
          const isfieldHaveValue = req[key] !== undefined;
          if (isfieldHaveValue) {
            if (req[key] < gte.split("=")[1]) throw new Error(domain.validationFailureErrResMsg);
          }
        }

        //validate email
        if (struct[key].validate.find((v) => v.includes("email"))) {
          if (!isEmail(String(req[key]))) throw new Error(domain.validationFailureErrResMsg);
        }
      }
    } catch (error) {
      this.#error = error;
      return this;
    }
    return this;
  }
  Parse() {
    const req = this.req;
    const structKeys = this.#structKeys;
    const result = this.result;

    try {
      if (this.#error !== null) throw new Error(this.#error);
      for (const field of structKeys) {
        if (req[field] === undefined) continue;
        result[field] = req[field];
      }
    } catch (error) {
      const parseError = help.parseErrorMessage(error.message);
      return [null, parseError];
    }
    return [result, null];
  }
}

module.exports = Validator;
