var express = require('express');
var router = express.Router();

const weaponkrModel = require('../models/weaponkrModel');

// URL : localhost:3001/weaponkr
router.get('/', async (req, res) => {
  // SQL : SELECT * FROM weaponkr
  var weaponkr = await weaponkrModel.find();
  //res.send(weaponkrs);
  // render ra file view : views/weaponkr/index.hbs và gửi kèm data thông qua biến 'weaponkrs'
  res.render('weaponkr/index', { weaponkr: weaponkr });
})

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  // SELECT * FROM weaponkr WHERE id = 'id'
  var weaponkr = await weaponkrModel.findById(id);
  res.render('weaponkr/detail', { weaponkr: weaponkr });
})

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  await weaponkrModel.findByIdAndDelete(id);
  console.log('Delete weaponkr succeed');
  res.redirect('/weaponkr');
})

router.get('/add', (req, res) => {
  res.render('weaponkr/add');
})

router.post('/add', async (req, res) => {
  var weaponkr = req.body;
  await weaponkrModel.create(weaponkr);
  console.log('Add weaponkr succeed !');
  res.redirect('/weaponkr');
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var weaponkr = await weaponkrModel.findById(id);
  res.render('weaponkr/edit', { weaponkr: weaponkr })
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var weaponkr = req.body;
  await weaponkrModel.findByIdAndUpdate(id, weaponkr);
  console.log('Update weaponkr succeed !');
  res.redirect('/weaponkr');
})


module.exports = router;