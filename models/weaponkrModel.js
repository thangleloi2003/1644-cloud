var mongoose = require('mongoose')
var weaponkrSchema = mongoose.Schema(
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
var weaponkrModel = mongoose.model('weaponkr', weaponkrSchema, 'weaponkr')
module.exports = weaponkrModel;
