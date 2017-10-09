const express = require('express')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/',(req,res)=>{

  model.Subject.findAll({order:[['id','asc']]}).then(subjects => {
    let promSubject = subjects.map(subjects => {
      return new Promise((resolve,reject) => {
        subjects.getTeachers().then(teachers => {
          if(teachers) {
            let newTeachers = teachers.map(teacher => {
            	return teacher.getFullname()
            })
            subjects["guru"] = newTeachers
          } else {
            subjects["guru"] = 'unsigned';
          }
          resolve(subjects);
        }).catch(err => {
          reject(err);
        })
      })
    })
    Promise.all(promSubject)
    .then(newDataSubject=>{
      res.render('subject',{data:newDataSubject,title:`Subjects`,role:req.session.user});
    })
 })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/:id/enrollstudents', (req,res) => {
  model.StudentSubject.findAll({where:{SubjectId:req.params.id},attributes: [['id','id'],['StudentId','StudentId'],['SubjectId','SubjectId'],['score','score']]})
  .then(subjects => {
    let promSubject = subjects.map(subject => { // membuat array
      return new Promise((resolve,reject) => { // membuat objek promise {}
        subject.getStudent().then(student =>{
          subject['student'] = student.getFullname()
          if(subject.score == null){
            subject['score'] = `<a href="/subjects/${subject.id}/givescore">Give Score</a>`
            subject['score_letter'] = `empty`
          } else {
            subject['score'] = subject.score
            subject['score_letter'] = tools.convertScore(subject.score)
          }
          resolve(subject)
        }).catch(err => {
          reject(err)
        })
      })
    })
    Promise.all(promSubject).then(student => { //memangil semua promise
      model.Subject.findById(req.params.id).then(subject => {
        res.render('subject_enrollstudent', {student:student,subject:subject,title:'Enroll Student',role:req.session.user})
      })
    }).catch(err => {
      res.send(err)
    })
  })
})
router.get('/:id/givescore', (req,res) => {
  model.StudentSubject.findOne({where:{id:req.params.id},attributes: [['id','id'],['StudentId','StudentId'],['SubjectId','SubjectId']]}).then(studentSubject => {
    if(studentSubject){
      studentSubject.getStudent().then(student => {
        studentSubject.getSubject().then(subject => {
          studentSubject['student_name'] = student.getFullname()
          studentSubject['subject_name'] = subject.subject_name
          res.render('subject_givescore', {data:studentSubject,title:'Give Score',role:req.session.user})
        })
      })
    }
  }).catch(err => {
    res.send(err)
  })
})
router.post('/:id/givescore', (req,res) => {
  model.StudentSubject.update(req.body,{where:{id:req.params.id}}).then(update => {
    res.redirect('/subjects')
  })
})
router.get('/add', (req,res) => {
  res.render('subject_add', {msg:'',title:'Add Subject',role:req.session.user})
})
router.post('/add', (req,res) => {
  model.Subject.create(req.body).then(add => {
    res.redirect('/subjects')
  })
})
module.exports = router