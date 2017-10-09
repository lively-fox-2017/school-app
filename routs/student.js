const express = require('express')
const router = express.Router()
const model = require('../models')
router.get('/', (req,res) => {
	model.Student.findAll({order:[['first_name','asc']]}).then(students => {
		res.render('student', {data:students,title:'Student',role:req.session.user})
	}).catch(err => {
		res.send(err)
	})
})
router.get('/add', (req,res) => {
	res.render('student_add', {msg:'',title:'Add Student',role:req.session.user})
})
router.post('/add', (req,res) => {
	model.Student.create(req.body).then(add => {
		res.redirect('/students')
	}).catch(err => {
		model.Student.findAll().then(students => {
			res.render('student_add', {data:students,msg:err.errors[0].message,title:'Add Student',role:req.session.user})
		})
	})
})
router.get('/edit/:id', (req,res) => {
	model.Student.findById(req.params.id).then(student => {
		res.render('student_edit', {data:student,msg:'',title:'Edit Student',role:req.session.user})
	}).catch(err => {
		res.send(err)
	})
})
router.post('/edit/:id', (req,res) => {
	model.Student.update(req.body,{where:{id:req.params.id},validate:false}).then(update => {
		res.redirect('/students')
	}).catch(err => {
		model.Student.findById(req.params.id).then(student => {
			res.render('student_edit', {data:student,msg:err.errors[0].message,title:'Edit Student',role:req.session.user})
		})
	})
})
router.get('/delete/:id', (req,res) => {
	model.Student.destroy({where:{'id':req.params.id}}).then(student => {
		res.redirect('/students')
	})
})
router.get('/:id/addsubjects', (req,res) => {
	Promise.all([
		model.Student.findById(req.params.id),
		model.Subject.findAll()
	]).then(resource => {
		res.render('student_addsubject',{student:resource[0],subject:resource[1],title:'Add Subject',role:req.session.user})
	}).catch(err => {
		res.send(err)
	})
})
router.post('/:id/addsubjects', (req,res) => {
	let input = {StudentId:req.body.StudentId,SubjectId:req.body.SubjectId}
	model.StudentSubject.create(input).then(add => {
		res.redirect('/students')
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router