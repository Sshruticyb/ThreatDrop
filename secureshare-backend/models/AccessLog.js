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
    default: Date.nows
  }

});

module.exports = mongoose.model(
  "AccessLog",
  accessLogSchema
);