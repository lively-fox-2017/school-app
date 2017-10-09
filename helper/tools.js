const cryptorjs = require('cryptorjs');

class Tools{
	static convertScore(score){
		if(score > 85) {
			return 'A'
		}
		else if(score > 70) {
			return 'B'
		}
		else if(score > 55) {
			return 'C'
		}
		else if(score <= 85) {
			return 'E'
		}
	}
	static isLogin(req,res,next){
	  	if(req.session.isLogin){
	    	next()
	  	}else{
	    	res.render('login', {msg:'',title:'User Login!'});
	  	}
	}
	static salt(){
		let txt = ''
		let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		for(let i = 0; i <= 5;i++) {
			txt += str.charAt(Math.floor(Math.random()*str.length))
		}
		return txt
	}
	static cryptor(salt,pass){
		let newPass = salt+pass
	    let Encrypt = new cryptorjs(salt);
	    let encoded = Encrypt.encode(newPass);
	    return encoded;
 	}
}
module.exports = Tools