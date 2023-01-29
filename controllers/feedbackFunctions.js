const feedbackModel = require("../models/feedback");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");
const SECRET_KEY = "USERAPI";
const createfeedback = async (req, resp) => {
  const { feedbackTitle, feedbackDescription } = req.body;
  console.log(feedbackTitle, feedbackDescription);

  const newfeedback = new feedbackModel({
    feedbackTitle: feedbackTitle,
    feedbackDescription: feedbackDescription,
    userID: req.userID,
  });

  try {
    await newfeedback.save();
    resp.status(201).json(newfeedback);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
};

const getfeedback = async (req, resp) => {
  try {
    const feedbacks = await feedbackModel.find({ userID: req.userID });
    resp.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
};

const updatefeedback = async (req, resp) => {
  const id = req.params.id;
  const { feedbackTitle, feedbackDescription } = req.body;
  const newfeedback = new feedbackModel({
    feedbackTitle: feedbackTitle,
    feedbackDescription: feedbackDescription,
    userID: req.userID,
  });
  try {
    await feedbackModel.findByIdAndUpdate(id, newfeedback, { new: true });
    resp.status(200).json(newfeedback);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
};

const deletefeedback = async (req, resp) => {
  const id = req.params.id;
  try {
    const feedback = await feedbackModel.findByIdAndRemove(id);
    resp.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = {
  createfeedback,
  getfeedback,
  updatefeedback,
  deletefeedback,
};
