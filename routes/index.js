var express = require('express');
const UserModel = require('../models/userModel');
const beltkrModel = require('../models/beltkrModel');
const weaponkrModel = require('../models/weaponkrModel');
var router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', async (req, res) => {
  // Cách 2: dùng hàm findOne của mongoose
  var login = await UserModel.findOne(
    {
      username: req.body.username,
      password: req.body.password
    }
  )
  //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
  if (login)  //login == true
    res.redirect('/adminpage')
  else
    res.redirect('/login');
})

router.get('/', async function (req, res) {
  var beltkr = await beltkrModel.find();
  var weaponkr = await weaponkrModel.find();
  // render ra file view : views/adminpage/index.hbs và gửi kèm data thông qua biến 'adminpages'
  res.render('index', { beltkr: beltkr, weaponkr: weaponkr });
})
module.exports = router;
