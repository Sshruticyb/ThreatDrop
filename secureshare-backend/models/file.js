const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(

  {

    filename: {
      type: String
    },

    path: {
      type: String
    },

    uuid: {
      type: String
    },
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},

    sha256: {
      type: String
    },

    md5: {
      type: String
    },

    quarantined: {
      type: Boolean,
      default: false
    },

    downloadCount: {
      type: Number,
      default: 0
    },
   
    uploadDate: {
      type: Date,
      default: Date.now
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "File",
  fileSchema
);