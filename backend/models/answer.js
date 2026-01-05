const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  testId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Test",
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  answers:[
    {
      questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true
      },
      selectedOption:{
        type:Number,
        required:true
      }
    }
  ],
  score:{
    type:Number,
    default:0
  },
  submittedAt:{
    type:Date
  }
},{timestamps:true});

module.exports = mongoose.model("Attempt",attemptSchema);
