const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let { email, password, username, name, age } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User already register");
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await userModel.create({
          username,
          email,
          age,
          name,
          password: hash,
        });
        let token = jwt.sign({ email: email, userid: user._id }, "shhhhhhhh");
        res.cookie("token", token);
        res.status(200).send({
          success: true,
          message: "registered",
          data: token,
          user: user,
        });
      });
    });
  } catch (error) {
    console.log("error in registor", error);
  }
};

// login
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// // profile
// app.get("/profile", isloggedIn, (req, res) => {
//   console.log(req.user);
//   res.render("login");
// });

// // login
// app.post("/login", async function (req, res) {
//   let { email, password } = req.body;
//   let user = await userModel.findOne({ email });
//   if (!user) return res.status(500).send("Something went wrong");
//   bcrypt.compare(password, user.password, function (err, result) {
//     if (result) {
//       let token = jwt.sign({ email: email, userid: user._id }, "shhhhhhhh");
//       res.cookie("token", token);
//       res.status(200).send("you are login");
//     } else res.redirect("/login");
//   });
//   let token = jwt.sign({ email: email, userid: user._id }, "shhhhhhhh");
//   res.cookie("token", token);
// });

module.exports = { register };
