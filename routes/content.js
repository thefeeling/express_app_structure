var express = require('express');
var router = express.Router();

router.use('/api', require("./api/content")); // API

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', (req, res) => {
	res.send('/content');
});

router.get('/about', (req, res) => {
	res.send('/content/about');
});

module.exports = router;
