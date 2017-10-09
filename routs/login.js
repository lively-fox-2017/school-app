const express = require('express')
const tools = require('../helper/tools')
const model = require('../models')
const router = express.Router()
router.get('/', (req,res) => {
	res.render('login', {msg:'', title:'User Login!',title:'Add Student',role:req.session.user})
})
router.get('/out', (req,res) => {
    req.session.destroy();
    res.redirect('/')
})
router.post('/', (req,res) => {
	model.User.findOne({where:{username:req.body.username}})
	.then(user => {
		if(user) {
			let oldPass = user.password
			let newPass = tools.cryptor(user.salt,req.body.password)
			if(newPass === oldPass) {
		        req.session.isLogin = true;
		        req.session.user={username:user.username,role:user.role,logTime:new Date()}
				res.redirect('/')
			} else {
				res.render('login', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
			}
		} else {
			res.render('login', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
		}
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = router
