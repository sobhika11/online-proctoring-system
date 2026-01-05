const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  testId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Test",
    required:true
  },
  question:{
    type:String,
    required:true
  },
  options:{
    type:[String],
    required:true
  },
  correctOption:{
    type:Number,
    required:true
  },
  marks:{
    type:Number,
    default:1
  }
},{timestamps:true});

module.exports = mongoose.model("Question",questionSchema);
