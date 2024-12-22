const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);
const postSchema = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        date: {
            type: Date,
            default: Date.now
        },
        content: String,
        likes:[
            {type: mongoose.Types.ObjectId, ref:'user'}
        ]
           
})
module.exports= mongoose.model('post',postSchema);