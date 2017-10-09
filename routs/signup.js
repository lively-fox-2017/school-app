const express = require('express')
const session = require('express-session')
const model = require('../models')
const router = express.Router()
const tools = require('../helper/tools')

router.get('/', (req,res) => {
	res.render('signup', {title:'Signup user',role:req.session.user})
})
router.post('/', (req,res) => {
	let input = {}
	input['username'] = req.body.username
	input['password'] = req.body.password
	input['salt'] = tools.salt()
	input['role'] = req.body.role
	model.User.create(input).then(add => {
		res.redirect('/login')
	}).catch(err => {
		res.send(err)
	})
})
module.exports = router
