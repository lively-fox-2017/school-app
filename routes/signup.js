const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function(req,res) {
  Model.User.findAll()
  .then(dataUser=> {
    res.render('signup', {dataUser: dataUser})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/', function(req,res) {
  Model.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  })
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
