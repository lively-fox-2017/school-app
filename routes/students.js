const express = require('express')
const router = express.Router()
const Model = require('../models')

router.use((req, res, next)=>{
  console.log("==== MASUK STUDENT", req.session);
  if(req.session.role === 'teacher' || req.session.role === 'academic' || req.session.role === 'headmaster' ){
    next()
  }else {
    res.redirect('/')
  }
})

router.get('/', function(req,res ) {
  Model.Student.findAll({
    order: [['first_name','ASC']]
  })
  .then(dataStudent => {
    res.render('students/students', {dataStudent: dataStudent, session: req.session})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  res.render('students/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  // .save()
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    // res.send(err.message)
      if (err.message == 'Validation error: Validation isEmail on email failed'){
        Model.Student.findAll()
        .then(dataStudent=> {
          res.render('teachers/add', {dataStudent: dataStudent, dataError: 'Email Tidak Valid'})
        })
      }
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Student.findById(req.params.id)
  .then(dataStudent => {
    // res.send(dataTeacher)
    res.render('students/edit', { dataStudent: dataStudent, dataError: null })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    // res.send(err)
    if (err.message == 'Validation error: Validation isEmail on email failed'){
      Model.Student.findAll()
      .then(dataStudent=> {
        res.render('teachers/add', {dataStudent: dataStudent, dataError: 'Email Tidak Valid'})
      })
    }
  })
})

router.get('/assign/:id', function(req,res) {
  Model.Student.findById(req.params.id)
  .then(dataStudent => {
    Model.Subject.findAll()
    .then(dataSubject => {
      // res.send(dataTeacher)
      res.render('students/assign', { dataStudent: dataStudent, dataSubject: dataSubject, dataError: null })
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/assign/:id', function(req,res) {
  Model.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
