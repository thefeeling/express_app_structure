const express = require('express');
const router = express.Router();

// Common Logger
const logger = require('../config/logger');

//router.use('/api', require("./api/content")); // API

//router.use(function timeLog(req, res, next) {
//	console.log('Time: ', Date.now());
//	next();
//});

router.get('/', (req, res) => {
	logger.info('Hello distributed log files!');
	res.send('/content');
});

router.get('/about', (req, res) => {
	res.send('/content/about');
});

module.exports = router;