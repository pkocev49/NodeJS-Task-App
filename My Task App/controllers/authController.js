import User from "../models/User.js";
import jwt from "jsonwebtoken";

// HANDLE ERRORS
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  // incorrecet email
  if (err.message === "incorrect email") {
    errors.email = "that email is not reqistered";
  }
  if (err.message === "incorrect password") {
    errors.password = "that password is not incorrect";
  }
  // duplicate err coed
  if (err.code == "11000") {
    errors.email = "this email alredy exists";
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// CREATE A JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "big secret 101", {
    expiresIn: maxAge,
  });
};

class AuthController {
  async getLoginView(req, res) {
    res.render("loginHome");
  }
  async getRegisteView(req, res) {
    res.render("signup");
  }
  //////// SIGN UP POST ///////////////////
  async signup_post(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).send({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }

  async login_post(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
}
export default AuthController;
