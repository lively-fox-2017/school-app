const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
	res.render('index', {title:'School Aplication',role:req.session.user})
})
module.exports = router