const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

/**
 * [IP WHITE LIST]
 */
const whiteList = (req, res, next) => {
	next();
}

/**
 * [HTTP ROUTE INFO]
 */
const routeInfo = (req, res, next) => {
	let paramTxt     = '',
		routeInfo    = '',
		method       = req.method.toUpperCase(),
		tmpTargetObj = (method === "POST") ? req.body : req.query;


	if(Object.keys(tmpTargetObj).length){
		for (let key in tmpTargetObj) {
			paramTxt += `- ${key.toString()} : ${tmpTargetObj[key]}\n\t`
		}
		paramTxt = `${((method === "POST") ? "[BODY]" : "[QUERY]")}\n\t${paramTxt}`
	}

	routeInfo = `
	[Common Routing Info]
	-----------------------------
	[IP]           : ${req.ip}
	[PROTOCOL]     : ${req.protocol} 
	[HTTP METHOD]  : ${req.method}
	[CONTENT-TYPE] : ${req.get('Content-Type')}
	[PATH]         : ${req.path}
	[ORIGIN-URL]   : ${req.originalUrl}
	[XHR_YN]       : ${req.xhr}
	${paramTxt}
	`
	logger.debug(routeInfo);
	next();
}


// Set MiddleWares
router.use(routeInfo);    // [HTTP ROUTE INFO]
router.use(whiteList);    // [WHITE LIST IP]

// [ROUTE ADD]
router.use('/content'   , require('./content') );
router.use('/mypage'    , require('./mypage')  );
router.use('/user'      , require('./user')    );
router.use('/board'     , require('./board')   );

// Non Matched URL route -> ErrHandle
router.all('/*', (req,res,next) => {
	next({err:"msg"});
})

// [ERROR HANDLER]
router.use((err, req, res, next)=>{
	console.log(err);
	let contentsType = req.get('Content-Type')
	// logger.error(err.stack);
	res.status(404).send("test");
});


module.exports = router;