const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');
const logger = require('../config/logger');

/**
 * 
 */
router.get('/index', (req, res)=> {
	if (req.session.userSession) {
		res.json(req.session.userSession);
	} else {
		res.json({
			msg : "non_session"
		});
	}
});


/**
 * 
 */
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


/**
 * 
 */
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
			"email"    : email
		}
	})
	.then((result)=>{
		return new Promise((resolve, reject) => {
			if(!result){
				reject(new Error("AuthError::Do Not Have AccountInfo"))
			}
			else{
				let userSaltHex = result.password.substring(0,32);
				let userPassHex = result.password.substring(32,96);
				
				let authenticate = (err, key) => {
					if (err) {reject(err);}
					
					logger.debug("key.toString('hex') : " + key.toString('hex'));
					logger.debug("userPassHex : " + userPassHex);

					key.toString('hex') === userPassHex ? 
					resolve(result) : reject("AuthError::Invalid Password")					
				}

				crypto.pbkdf2(password, userSaltHex, 1000, 32, 'sha512', authenticate);
			}
		})
	})
	.then((result) => {
		req.session.userSession = result;
		logger.info(`userSession create`);		
		req.session.save(()=>{
			res.json({
				msg : "login_success"
			});
		});				
	})
	.catch((err)=>{
		logger.error(`${err.name} // ${err.message}`);
		res.json({
			msg : "failure"
		});
	})
});


/**
 * 
 */
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



/**
 * 
 */
router.post('/join', (req, res)=>{
	let email    = req.body.email;
	let password = req.body.password;
	
	((params) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err){
					reject(err);
				}
				let randomSaltStr = buf.toString('hex');
				logger.debug(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
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
			throw new Error("TxError::Rollback");
		}		
	})
	.catch(function(err){
		logger.error(`${err.message}`);
		res.send('failure');
	})
});


module.exports = router;
