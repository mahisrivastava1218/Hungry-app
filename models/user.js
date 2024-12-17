const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{type : mongoose.Schema.Types.ObjectId, ref: 'post'}]
})
module.exports= mongoose.model('user',userSchema);