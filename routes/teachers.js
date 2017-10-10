const express = require('express')
const router = express.Router()
const Model = require('../models')

router.use((req,res,next) => {
  if (req.session.role === 'headmaster') {
    next()
  } else {
    res.redirect('/')
  }
})

router.get('/', function(req,res ) {
  Model.Teacher.findAll({
    order: [['id', 'ASC']]
  })
  .then(dataTeacher => {
    let promise = dataTeacher.map((teacher) => {
      return new Promise((resolve,reject) => {
        teacher.getSubject()
         .then(subject => {
          //  console.log('ini data subject',subject);
           if(subject) {
             teacher.subject_name = subject.subject_name;
           } else {
             teacher.subject_name = '-- unassigned --';
           }
           resolve(teacher);
         })
         .catch(err => {
           reject(err)
         })
      })
    })

    Promise.all(promise)
     .then(fixDataTeachers => {
      res.render('teachers/teachers', {dataTeacher: fixDataTeachers, session: req.session})
     })
  })
  .catch(err => {
    res.send(err)
  })
})


// models.Subject.findAll()
// .then(subjects => {
//   subjects.map(subject => {
//     subject.getTeachers()
//      .then(teachers) [arrayOfObjectDariTeacher]
//   })
// })

router.get('/add', function(req,res) {
  res.render('teachers/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  })
  // .save()
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    // res.send(err.message)
      if (err.message == 'Validation error: Validation isEmail on email failed'){
        Model.Teacher.findAll()
        .then(dataTeacher=> {
          res.render('teachers/add', {dataTeacher: dataTeacher, dataError: 'Email Tidak Valid'})
        })
      }
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    Model.Subject.findAll()
    .then(dataSubject => {
      // res.send(dataTeacher)
      res.render('teachers/edit', { dataTeacher: dataTeacher, dataSubject: dataSubject, dataError: null })
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    // res.send(err)
    if (err.message == 'Validation error: Validation isEmail on email failed'){
      Model.Teacher.findAll()
      .then(dataTeacher=> {
        res.render('teachers/add', {dataTeacher: dataTeacher, dataError: 'Email Tidak Valid'})
      })
    }
  })
})

router.get('/assign/:id', function(req,res) {
  Model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    Model.Subject.findAll()
    .then(dataSubject => {
      // res.send(dataTeacher)
      res.render('teachers/assign', { dataTeacher: dataTeacher, dataSubject: dataSubject, dataError: null })
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/assign/:id', function(req,res) {
  Model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
