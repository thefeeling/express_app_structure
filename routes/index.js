const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

/**
 * 
 */
const whiteList = (req, res, next) => {
	//logger.debug(req.ip);
	next();
}

/**
 * [HTTP ROUTE INFO]
 */
const routeInfo = (req, res, next) => {
	let body = '';
	let	routeInfo;
	if(req.method === 'POST' || req.method === 'post'){
		for (let key in req.body) {
			body += `- ${key.toString()} : ${req.body[key]}\n\t`
		}
	}

	routeInfo = `
	[Common Routing Info]
	[PROPERTY]    [VALUE]
	-----------------------------
	IP          : ${req.ip}
	PROTOCOL    : ${req.protocol} 
	HTTP METHOD : ${req.method}
	PATH        : ${req.path}
	ORIGIN-URL  : ${req.originalUrl}
	XHR YN      : ${req.xhr}
	BODY        :
	${body}
	`
	logger.debug(routeInfo);
	next();	
}


// Set MiddleWares
router.use(routeInfo); // [HTTP ROUTE INFO]
router.use(whiteList); // [WHITE LIST IP]

// [ROUTE ADD]
router.use('/content'  , require('./content'));
router.use('/mypage'   , require('./mypage'));
router.use('/user'     , require('./user'));

module.exports = router;