const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema({

  fileUuid: {
    type: String,
    required: true
  },

  ipAddress: {
    type: String,
    required: true
  },

  userAgent: {
    type: String,
    required: true
  },

  accessTime: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "AccessLog",
  accessLogSchema
);