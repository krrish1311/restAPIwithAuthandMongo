const {
  getfeedback,
  createfeedback,
  updatefeedback,
  deletefeedback,
} = require("../controllers/feedbackFunctions");
const auth = require("../middlewares/auth");

const feedbackRouters = require("express").Router();

feedbackRouters.get("/myfeedback", auth, getfeedback);

feedbackRouters.post("/addfeedback", auth, createfeedback);

feedbackRouters.put("/:id", auth, updatefeedback);

feedbackRouters.delete("/:id", auth, deletefeedback);

module.exports = feedbackRouters;
