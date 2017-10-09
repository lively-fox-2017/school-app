const express = require('express')
const session = require('express-session')
const model = require('../models')
const router = express.Router()
const tools = require('../helper/tools')

router.get('/', (req,res) => {
	model.User.findAll().then(users => {
		res.render('user', {data:users,title:'Users',role:req.session.user})
	}).catch(err => {
		next()
	})
})
router.get('/add', (req,res) => {
	res.render('user_add', {msg:'',title:'Add Users',role:req.session.user})
})
router.post('/add', (req,res) => {
	let input = {}
	input['username'] = req.body.username
	input['password'] = req.body.password
	input['salt'] = tools.salt()
	input['role'] = req.body.role
	model.User.create(input).then(add => {
		res.redirect('/users')
	}).catch(err => {
		res.send(err)
	})
})
router.get('/delete/:id', (req,res) => {
	model.User.destroy({where:{id:req.params.id}})
	.then(del => {
		res.redirect('/users')
	})
})
module.exports = router
