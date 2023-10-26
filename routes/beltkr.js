var express = require('express');
var router = express.Router();

const beltkrModel = require('../models/beltkrModel');

// URL : localhost:3001/beltkr
router.get('/', async (req, res) => {
  // SQL : SELECT * FROM beltkr
  var beltkr = await beltkrModel.find();
  //res.send(beltkrs);
  // render ra file view : views/beltkr/index.hbs và gửi kèm data thông qua biến 'beltkrs'
  res.render('beltkr/index', { beltkr: beltkr });
})

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  // SELECT * FROM beltkr WHERE id = 'id'
  var beltkr = await beltkrModel.findById(id);
  res.render('beltkr/detail', { beltkr: beltkr });
})

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  await beltkrModel.findByIdAndDelete(id);
  console.log('Delete beltkr succeed');
  res.redirect('/beltkr');
})

router.get('/add', (req, res) => {
  res.render('beltkr/add');
})

router.post('/add', async (req, res) => {
  var beltkr = req.body;
  await beltkrModel.create(beltkr);
  console.log('Add beltkr succeed !');
  res.redirect('/beltkr');
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var beltkr = await beltkrModel.findById(id);
  res.render('beltkr/edit', { beltkr: beltkr })
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var beltkr = req.body;
  await beltkrModel.findByIdAndUpdate(id, beltkr);
  console.log('Update beltkr succeed !');
  res.redirect('/beltkr');
})



module.exports = router;