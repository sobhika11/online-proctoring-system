const mongoose = require("mongoose");
const { Schema } = mongoose;
const testAttemptSchema = new Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "test",  
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",   
      required: true
    },
    status: {
      type: String,
      enum: ["STARTED", "SUBMITTED", "AUTO_SUBMITTED"],
      default: "STARTED"
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    submittedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("testAttempt", testAttemptSchema);
