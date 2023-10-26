var mongoose = require('mongoose')
var beltkrSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: String,
    price: {
      type: Number
    },
    status: String,
    image: String,
    description: String
  }
)
var beltkrModel = mongoose.model('beltkr', beltkrSchema, 'beltkr')
module.exports = beltkrModel;
