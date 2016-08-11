const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

const httpRouteInfo     = require('./middlewares/httpRouteInfo');
const ipWhiteListVerify = require('./middlewares/ipWhiteListVerify');


// [DEFAULT MIDDLEWARES]
router.use(httpRouteInfo);        // [HTTP ROUTE INFO]
router.use(ipWhiteListVerify);    // [WHITE LIST IP]


// [ROUTE ADD]
router.use('/content'   , require('./content') );
router.use('/mypage'    , require('./mypage')  );
router.use('/user'      , require('./user')    );
router.use('/board'     , require('./board')   );

// [ERROR HANDLER]
router.use((err, req, res, next) => {
	/**
	 * Accept : 클라에서 어떤 유형의 데이터를 받고 싶은지를 표기
	 * Content-type : 실제로 서버로 보내는 데이터 타입/유형
	 */
	logger.info(err);
	// logger.info(`${req.accepts('html')} :: ${req.accepts('json')}`);
	// logger.info(`${req.is('json')} :: ${req.is('application/json')} :: ${req.is('application/*')}`);
	// logger.info(`${req.is('text/html')} :: ${req.is('application/xhtml+xml')} :: ${req.is('application/*')}`);
	// console.log(req.is('text/html'));
	// console.log(req.is('application/json'));
	logger.info(`${req.get('Accept')}`);
	logger.info(req.get('Content-Type'));
	let contentsType = req.get('Content-Type');
	res.status(500).send('500');
});


/**
 * -----------------------------------
 * Non Matched URL route -> ErrHandle
 * -----------------------------------
 */
router.use((req, res, next) => {
	res.status(404).send('Sorry cant find that!');
})

module.exports = router;