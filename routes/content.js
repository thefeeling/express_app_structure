var express = require('express');
var router = express.Router();

router.use('/api', require("./api/content")); // REST API

router.use(function timeLog(req, res, next) {
      console.log('Time: ', Date.now());
      next();
});

router.get('/', function(req, res) {
      res.send('/content');
});
router.get('/about', function(req, res) {
      res.send('/content/about');
});

module.exports = router;
