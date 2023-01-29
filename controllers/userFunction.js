const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "USERAPI";
const signup = async (req, resp) => {
  const { username, password, email } = req.body;
  try {
    const existinguser = await userModel.findOne({ email: email });
    if (existinguser) {
      console.log("Already existed");
      return resp.status(400).json({ message: "User ALready existed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    resp.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "something went wrong" });
  }
};
const signin = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const existinguser = await userModel.findOne({ email: email });
    if (!existinguser) {
      console.log("User Not FOund");
      return resp.status(404).json({ message: "User Not Found !" });
    }
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      console.log("Invalid Credential");
      resp.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      SECRET_KEY
    );
    resp.status(201).json({ user: existinguser, token: token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "something went wrong" });
  }
};
module.exports = { signup, signin };
