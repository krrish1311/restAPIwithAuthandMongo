const express = require("express");
const userRouters = require("./Routers/userRouters");
const feedbackRouters = require("./routers/feedbackRouters");

const app = express();
app.use(express.json());
app.use("/user", userRouters);
app.use("/feedback", feedbackRouters);
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin:8766533434@users.o9waggq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(7000, () => {
      console.log("the server is running at 7000 port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
