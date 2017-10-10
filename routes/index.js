var express = require('express');
var router = express.Router();
const Model = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  Model.User.findAll()
  .then(dataUser => {
    res.render('index', {dataUser:dataUser, title: 'Express', session: req.session });
  })
  .catch(err => {
    res.send(err)
  })
});

module.exports = router;
