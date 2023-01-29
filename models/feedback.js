const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema(
  {
    feedbackTitle: {
      type: String,
      required: true,
    },
    feedbackDescription: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
