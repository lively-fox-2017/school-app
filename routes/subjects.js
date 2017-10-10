const express = require('express')
const router = express.Router()
const Model = require('../models')
const helper = require('../helper/helper-score')
const fullname = require('../helper/fullname')

router.use((req,res,next) => {
  if(req.session.role === 'academic' || req.session.role === 'headmaster') {
    next()
  }else{
    res.redirect('/')
  }
})

router.get('/', function(req,res ) {
  Model.Subject.findAll()
  .then(dataSubject => {
    let promise = dataSubject.map((subject) => {
      return new Promise((resolve,reject) => {
        subject.getTeachers()
         .then(teacher => {
           if(teacher) {
             let newData = teacher.map(dataTeacher => {
               return dataTeacher.fullname()
             })
            //  console.log(newData);
             subject["teacher"] = newData
           } else {
             subject["teacher"] = ['UNASSIGNED']
           }
           resolve(subject);
         })
         .catch(err => {
           reject(err)
         })
      })
    })
    Promise.all(promise)
     .then(fixDataSubjects => {
      res.render('subjects/subjects', {dataSubject: fixDataSubjects, session: req.session})
     })
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  res.render('subjects/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Subject.create({
    subject_name: req.body.subject_name
  })
  // .save()
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Subject.findById(req.params.id)
  .then(dataSubject => {
    // res.send(dataTeacher)
    res.render('subjects/edit', { dataSubject: dataSubject })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Subject.update({
    subject_name: req.body.subject_name
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/assign/:id', function(req,res) {
  Model.StudentSubject.findAll({
    where: {
      SubjectId: req.params.id
    },
    include: [Model.Student, Model.Subject]
  })
  .then(dataSubjectStudent => {
    console.log(dataSubjectStudent, " <----------- Ini data SubjectStudent");
    if (dataSubjectStudent[0].Subject.subject_name == null) {
      res.send('Data Belum Ada')
    } else {
      // res.send(dataSubjectStudent)
      console.log('<-----------------------sampe sini');
      // res.send(dataSubjectStudent)
      res.render('subjects/assign', { dataSubjectStudent: dataSubjectStudent, helper:helper})
    }
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/assign/:id/:ids/givescore', (req, res)=>{
  Model.Subject.findAll({
    where: {
      id: req.params.ids
    }
  })
  .then((dataSubject) => {
    Model.Student.findAll({
      where: {
        id: req.params.id
      }
    })
    // console.log(dataSubject, '<------ data subject yang baru');
    .then((dataStudent) => {
      // console.log(dataSubject, '<---------- data subject');
      // res.send(dataStudent)
      res.render('subjects/givescore', {dataStudent:dataStudent[0], dataSubject:dataSubject[0]})
    })
  })
})

router.post('/assign/:id/:ids/givescore', (req, res)=>{
  Model.StudentSubject.update({
    score: req.body.score
  },{
    where: {
      StudentId: req.params.id,
      $and: {
        SubjectId: req.params.ids
      }
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
})

module.exports = router
