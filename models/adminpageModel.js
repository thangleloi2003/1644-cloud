var mongoose = require('mongoose')
var adminpageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty']
    },
    type: String,
    // typep: {
    //   type: String,
    //   enum: ['Belt', 'Weapon']
    // },
    price: {
      type: Number
    },
    status: String,
    image: String,
    description: String,
    // dob: Date
  }
)
var adminpageModel = mongoose.model('adminpage', adminpageSchema, 'adminpage')
module.exports = adminpageModel;
