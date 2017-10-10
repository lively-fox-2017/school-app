const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function(req, res) {
  res.render('login', {errData: false});
});

router.post('/login', function(req,res) {
  Model.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then(dataUser => {
    if(dataUser == null) {
      res.render('login', {errData: 'Username atau Password Salah!!'})
    } else {
      // let guess =  req.body.password+dataUser.salt
      //
      //
      req.session.hasLogin = true
      req.session.role = dataUser.role
      console.log(req.session);
      res.redirect('/index')
    }
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
