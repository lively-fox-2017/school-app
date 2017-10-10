const express = require('express');
const router = express.Router();
const Model = require('../models')
const session = require('express-session')
const bcrypt = require('bcrypt')

router.get('/', function(req, res) {
  res.render('login', {session: req.session, errData: false});
});

router.post('/login', function(req,res) {
  Model.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(dataUser => {
    if(dataUser == null) {
      // console.log('--------------------- > sampe siniiiiiii');
      res.render('login', {errData: 'Username atau Password Salah!!'})
    } else if (bcrypt.hashSync(req.body.password, dataUser.salt) === dataUser.password) {
      // console.log('-------------- Sampe Sini');
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
