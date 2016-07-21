var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', function (req, res) {
	if (req.session.userSession) {
		res.send('/mypage on session');
	} else {
		res.send('/mypage off session');
	}
});
router.get('/about', function (req, res) {
	res.send('/mypage/about');
});

module.exports = router;
