const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    test_name: {
      type: String,
      required: true
    },

    test_link_by_user: {
      type: String
    },

    test_code: {
      type: String,
      required: true,
      unique: true
    },

    start_time: {
      type: Date,
      required: true
    },

    end_time: {
      type: Date,
      required: true
    },

    no_of_candidates_appear: {
      type: Number,
      default: 0
    },
    
    total_threshold_warnings: {
      type: Number,
      default: 3
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);