const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req,res) => {
  Model.Teacher.findAll()
  .then(teachers=>{
    let promise = teachers.map((data)=>{
      return new Promise((resolve,reject)=>{
        data.getSubject()
        .then(subject=>{
          if(subject){
            data.subject_name = subject.subject_name
          }else {
            data.subject_name = '---Unassigned---'
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(result =>{
      res.render('teachers',{dataTeachers:result})
    })
  })
})

router.get('/add',(req,res)=>{
  Model.Teacher.findAll()
  .then(teachers=>{
    res.render('add_teachers',{dataTeachers:teachers, dataError: null})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    // res.send(err.message)
    if(err.message == 'Validation error: Validation isEmail on email failed') {
      Model.Teacher.findAll()
      .then(data=>{
        res.render('add_teachers', {dataTeachers:data, dataError:"Email Tidak Valid"})
      })
    }
  })
})

router.get('/delete/:id',(req,res)=>{
  Model.Teacher.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(teachers=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Model.Teacher.findById(req.params.id)
  .then(data=>{
    Model.Subject.findAll()
    .then(subject=>{
      res.render('edit_teachers', {dataTeachers:data, dataSubjects:subject})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email,
    SubjectsId:req.body.SubjectsId
  },
  {
    where: {
      id:req.params.id
    }
  })
  .then(data=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
