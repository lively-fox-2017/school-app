const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function(req,res) {
  req.session.destroy()
  console.log(req.session);
  res.redirect('/')
})


module.exports = router
