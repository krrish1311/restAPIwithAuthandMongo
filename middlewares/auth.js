const jwt = require("jsonwebtoken");
const SECRET_KEY = "USERAPI";

const auth = (req, resp, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userID = user.id;
    } else {
      resp.status(400).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log("Unauthorized User");
    resp.status(400).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
