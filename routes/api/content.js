var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', function (req, res) {
	res.send('/contentAPI');
});
router.get('/about', function (req, res) {
	res.send('/content/aboutAPI');
});

module.exports = router;
