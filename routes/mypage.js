var express = require('express');
var router = express.Router();

// authentication middleware
function authentication(req, res, next){
	if (req.session.userSession) {
		console.log("userSessionYes");
		next();
	} else {
		console.log("userSession Non");
		res.json({
			msg : "session non"
		});
	}
}

// timeLog middleware
function timeLog(req, res, next){
	console.log('Time: ', Date.now());
	next();
}

router.use(timeLog)
router.use(authentication);


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
