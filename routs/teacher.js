const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req,res) => {
	model.Teacher.findAll({order:[['id','asc']]}).then(teachers => {
		let arr_prom = []
		teachers.forEach(teacher => {
			arr_prom.push(model.Subject.findById(teacher.SubjectId))
		})
		Promise.all(arr_prom).then(subjects =>{
			subjects.forEach((subject,i) => {
				if(subject){
					teachers[i]['sub'] = subject.subject_name
				}else{
					teachers[i]['sub'] = "unsigned"
				}
			})
			res.render('teacher', {data:teachers,title:'Teachers'})
		})
	})
})
router.get('/add', (req,res) => {
	model.Subject.findAll().then(subjects => {
		res.render('teacher_add', {subject:subjects,msg:'',title:'Add Teachers'})
	})
})
router.post('/add', (req,res) => {
	model.Teacher.create(req.body).then(add => {
		res.redirect('/teachers')
	}).catch(err => {
		res.send(err)
	})
})
router.get('/edit/:id', (req,res) => {
	Promise.all([
		model.Subject.findAll(),
		model.Teacher.findById(req.params.id)		
	]).then(resource => {
		model.Subject.findById(resource[1].SubjectId).then(subject => {
			if(subject){
				resource[1]['subject_name'] = subject.subject_name
			} else {
				resource[1]['SubjectId'] = ''
				resource[1]['subject_name'] = 'unsigned'
			}
			res.render('teacher_edit', {data:resource[1],subject:resource[0],msg:'',title:'Edit Teacher'})
		})
	}).catch(err => {
		res.send(err)
	})
})
router.post('/edit/:id', (req,res) => {
	model.Teacher.update(req.body,{where:{id:req.params.id}}).then(add => {
		res.redirect('/teachers')
	}).catch(err => {
		res.send(err)
	})
})
router.get('/delete/:id', (req,res) => {
	model.Teacher.destroy({where:{id:req.params.id}}).then(add => {
		res.redirect('/teachers')
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router