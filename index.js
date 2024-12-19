const express = require('express');
const app = express();
const userModel = require('./models/user.js');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());
app.get('/',function(req,res){
   res.render("index");
})
app.post('/register',async function(req,res){
   let {email, password, username, name, age} = req.body;
   let user = await userModel.findOne({email});
   if(user) return res.status(500).send("User already register")
   bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async(err, hash) =>{
         let user = await userModel.create({
            username,
            email,
            age,
            name,
            password: hash
         })
         let token = jwt.sign({email: email, userid: user._id},"shhhhhhhh");
         res.cookie("token",token);
         res.send("registered")
      })
   })
})
app.get('/login', (req,res)=>{
   res.render("login");
})
app.get('/profile',isloggedIn, (req,res)=>{
   console.log(req.user);
   res.render("login");
})
app.post('/login',async function(req,res){
   let {email, password} = req.body;
   let user = await userModel.findOne({email});
   if(!user) return res.status(500).send("Something went wrong")
   bcrypt.compare(password, user.password, function(err,result){
      if(result){
          let token = jwt.sign({email: email, userid: user._id},"shhhhhhhh");
         res.cookie("token",token);
         res.status(200).send("you are login");
      }else res.redirect('/login');
   })
   let token = jwt.sign({email: email, userid: user._id},"shhhhhhhh");
   res.cookie("token",token);
})
app.get('/logout',(req,res)=>{
   //delete token
   res.cookie("token","");
   res.redirect('/login');
})
//middleware
function isloggedIn(req,res,next){
   //check if token user must be logged in else dta jwt verify
   if(req.cookies.token === "") res.send("User must be login");
   else{
      let data = jwt.verify(req.cookies.token, "shhhhhhhh");
      req.user = data;
      next();
   }
}


// app.listen(3000);