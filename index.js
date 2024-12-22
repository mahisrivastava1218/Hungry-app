const express = require("express");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const userRouter = require("./src/routers/index");
const { mongoose } = require("mongoose");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
// app.get("/", function (req, res) {
//   res.render("index");
// });

// routes
app.get("/", async (req, res) => {
  try {
    return res.status(200).send({
      success: true,
      message: "OK",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

app.use("/user", userRouter); //login

//middleware
function isloggedIn(req, res, next) {
  //check if token user must be logged in else dta jwt verify
  if (req.cookies.token === "") res.send("User must be login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhhhhhh");
    req.user = data;
    next();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true
    });
    console.log(
      `Connected to MongoDB and server running on port http://localhost:${PORT}`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
});
// module.exports = app;
