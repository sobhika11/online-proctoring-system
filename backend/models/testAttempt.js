const mongoose = require("mongoose");
const { Schema } = mongoose;
const testAttemptSchema = new Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);
