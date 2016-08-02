const express = require('express');
const router = express.Router();
const models = require('../models');
const logger = require('../config/logger');
const sqlMap = require('../models/sqlmap/query');

router.get('/', (req, res) => {
	let option = {
		where: { use_yn: 1 },
		include: [
			{ model: models.User, required: true },
			{ model: models.BoardCategory, required: true }
		],
		benchmark : true
	}
	models.Board.findAll(option)
	.then((result)=>{
		logger.info(result)
		res.json(result);
	}).catch((err)=>{
		res.send("failure");
	});
});

router.get('/rawQueryTest', (req, res) => {
	let params = {
		test : 1
	}
	//models.rawQuery.select(sqlMap.validateQuery)
	models.rawQuery.select(sqlMap.rawQueryTest, params)
	.then((results) => {
		logger.debug(results);
		res.send(results);
	}).catch((err)=>{
		res.send("failure");
	});
});

router.get('/about', (req, res) => {
	res.send('/content/about');
});

module.exports = router;