const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    productPicture:[
        {img:{type:String}}
    ],
    quantity:{
        type:Number,
        required:true
    },
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            review:String
        }
    ],
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt:Date,

},{timestamps:true})


module.exports = mongoose.model("Product",productSchema)