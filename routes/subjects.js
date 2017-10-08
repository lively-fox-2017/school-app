const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req,res) => {
  Model.Subject.findAll()
  .then(subjects=>{
    let promise = subjects.map((data)=>{
      return new Promise((resolve,reject)=>{
        data.getTeachers()
        .then(teachers=>{
          if(teachers){
            let arrTeacher = teachers.map(dataTeacher=>{
              return dataTeacher.full_name()
            })
            data["teachers"] = arrTeacher
          } else {
            data["teachers"] = []
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
      res.render('subjects',{dataSubjects:result})
    })
  })
})

router.get('/add',(req,res)=>{
  Model.Subject.findAll()
  .then(subjects=>{
    res.render('add_subjects',{dataSubjects:subjects})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Subject.create({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(subjects=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Model.Subject.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Model.Subject.findById(req.params.id)
  .then(data=>{
    res.render('edit_subjects', {dataSubjects:data})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Subject.update({
    subject_name: req.body.subject_name,
  },
  {
    where: {
      id:req.params.id
    }
  })
  .then(data=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/enrolledstudents/:id', (req,res)=>{
  Model.SubjectStudent.findById(req.params.id)
  .then(conj=>{
    Model.Student.findAll()
    .then(student=>{
      res.render('enrolledstudents',{data:conj})
    })

  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
