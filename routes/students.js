const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req,res) => {
  Model.Student.findAll()
  .then(students=>{
    res.render('students',{dataStudents:students})
  })
  .catch(err=>{
    res.send(err)
  })
})


router.get('/add',(req,res)=>{
  Model.Student.findAll()
  .then(students=>{
    res.render('add_students',{dataStudents:students, dataError: null})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    if(err.message == 'Validation error: Validation isEmail on email failed') {
      Model.Student.findAll()
      .then(data=>{
        res.render('add_students', {dataStudents:data, dataError:"Email Tidak Valid"})
      })
    }
  })
})

router.get('/delete/:id',(req,res)=>{
  Model.Student.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(students=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Model.Student.findById(req.params.id)
  .then(data=>{
    res.render('edit_students', {dataStudents:data})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email,
  },
  {
    where: {
      id:req.params.id
    }
  })
  .then(data=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/addsubjects/:id', (req,res)=>{
  Model.Student.findById(req.params.id)
  .then(data=>{
    Model.Subject.findAll()
    .then(List=>{
      res.render('addlistsubjects', {dataStudents:data, dataSubjects:List})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})


router.post('/addsubjects/:id', (req,res)=>{
  console.log(req.body);
  Model.SubjectStudent.create({
    SubjectId: req.body.SubjectId,
    StudentId: req.params.id,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(data=>{
    // console.log(req.body.SubjectId);
    // res.send(data)
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
    })
  })
module.exports = router
