var mongoose = require("mongoose");

var appCrud = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
      },
      email: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
      },
      password: {
          type : String,
          required: true
      }
    },
    { timestamps: true }
  );
module.exports = mongoose.model("Appcrud", appCrud);