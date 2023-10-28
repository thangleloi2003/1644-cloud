var express = require('express');
var router = express.Router();
const adminpageModel = require('../models/adminpageModel');
const beltkrModel = require('../models/beltkrModel');
const weaponkrModel = require('../models/weaponkrModel');

// URL : localhost:3001/adminpage
router.get('/', async (req, res) => {
  // SQL : SELECT * FROM adminpage
  var adminpage = await adminpageModel.find();
  var beltkr = await beltkrModel.find();
  var weaponkr = await weaponkrModel.find();
  // render ra file view : views/adminpage/index.hbs và gửi kèm data thông qua biến 'adminpages'
  res.render('adminpage/index', { adminpage: adminpage, beltkr: beltkr, weaponkr: weaponkr });
})

// router.get('/detail/:id', async (req, res) => {
//   var id = req.params.id;
//   // SELECT * FROM adminpage WHERE id = 'id'
//   var adminpage = await adminpageModel.findById(id);
//   res.render('adminpage/detail', { adminpage: adminpage });
// })

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  await adminpageModel.findByIdAndDelete(id);
  await beltkrModel.findByIdAndDelete(id);
  await weaponkrModel.findByIdAndDelete(id);
  console.log('Delete adminpage succeed');
  res.redirect('/adminpage');
})

router.get('/add', (req, res) => {
  res.render('adminpage/add');
})

router.post('/add', async (req, res) => {
  var adminpage = req.body;
  await adminpageModel.create(adminpage);
  console.log('Add adminpage succeed !');
  res.redirect('/adminpage');
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var adminpage = await adminpageModel.findById(id);
  var beltkr = await beltkrModel.findById(id);
  var weaponkr = await weaponkrModel.findById(id);
  res.render('adminpage/edit', { adminpage: adminpage, beltkr: beltkr, weaponkr: weaponkr })
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var adminpage = req.body;
  await adminpageModel.findByIdAndUpdate(id, adminpage);
  var beltkr = req.body;
  await beltkrModel.findByIdAndUpdate(id, beltkr);
  var weaponkr = req.body;
  await weaponkrModel.findByIdAndUpdate(id, weaponkr);
  console.log('Update adminpage succeed !');
  res.redirect('/adminpage');
})

router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var adminpage = await adminpageModel.find({ name: new RegExp(keyword, "i") });
  var beltkr = await beltkrModel.find({ name: new RegExp(keyword, "i") });
  var weaponkr = await weaponkrModel.find({ name: new RegExp(keyword, "i") });
  res.render('adminpage/index', { adminpage: adminpage, beltkr: beltkr, weaponkr: weaponkr });
})

module.exports = router;