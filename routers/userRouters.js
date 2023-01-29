const { signup, signin } = require("../controllers/userFunction");

const userRouters = require("express").Router();

userRouters.post("/SIGNUP", signup);

userRouters.post("/SIGNIN", signin);

module.exports = userRouters;
