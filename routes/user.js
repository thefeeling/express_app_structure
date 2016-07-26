let express = require('express');
let router = express.Router();
let models = require('../models');
let crypto = require('crypto');

router.get('/index', (req, res)=> {
	if (req.session.userSession) {
		res.json(req.session.userSession);
	} else {
		res.json({
			msg : "non_session"
		});
	}
});

router.get('/login', (req, res)=> {
	if (req.session.userSession) {
		res.json({
			msg : "already_auth"
		});
	}else{
		res.json({
			msg : "auth_failure"			
		})
	}
});

router.post('/login', (req,res)=>{
	var email = req.body.email;
	var password = req.body.password;

	if (req.session.userSession) {
		res.json({
			msg : "already_auth_failure"
		});
	}

	models.User.findOne({
		where : {
			"email"    : email ,
			"password" : password
		}
	})
	.then((result)=>{
		req.session.userSession = result;
		req.session.save(()=>{
			res.json({
				msg : "login_success"
			});
		});		

	})
	.catch((err)=>{
		res.json({
			msg : "failure"
		});
	})
});

router.get('/logout', (req,res)=>{
	if (req.session.userSession) {
		req.session.destroy();
		res.clearCookie('sid');
		res.json({
			msg : "logout success"
		});
	} else {
		res.json({
			msg : "non usersession"
		});
	}
});



router.post('/join', (req, res)=>{
	var email = req.body.email;
	var password = req.body.password;
	
	// http://exploringjs.com/es6/ch_promises.html
	((params) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err){
					reject(err);
				}
				let randomSaltStr = buf.toString('hex');
				console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
				resolve(randomSaltStr);
			});			
		});		
	})()
	.then((salt) => {
		return new Promise((resolve, reject) => {
			crypto.pbkdf2(password, salt, 1000, 32, 'sha512', (err, key) => {
				if (err) {
					reject(err);
				}
				let hashedPassword = salt + key.toString('hex');
				resolve(hashedPassword)
			});			
		})
	})
	.then((hashedPassword) => {
		return models.User.create({ email: email, password : hashedPassword });	
	})
	.then((result) => {
		if (result) {
			res.json(result);
		}else{
			new Error("TxError::Rollback");
		}		
	})
	.catch(function(err){
		res.send('failure');
	})
});



module.exports = router;
