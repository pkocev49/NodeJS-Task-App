import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // CHECK JSON WEB TOKEN IF EXISTS AND ID IS VERIFIED
  if (token) {
    jwt.verify(token, "big secret 101", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// CHECK CURRENT USER
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "big secret 101", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
export { requireAuth, checkUser };
