const express   = require('express');
const validator = require('validator');
const models    = require('../models');
const logger    = require('../config/logger');
const sqlMap    = require('../models/sqlmap/query');
const router    = express.Router();


/**
 * board category info
 */
router.get('/', (req, res) => {
	let option = {
		where: { use_yn: 1 },
		attributes: ['board_category' ,'board_name', 'use_yn'],
		benchmark : true
	}
	models.BoardCategory.findAll(option)
	.then((result)=>{
		logger.info(result)
		res.json(result);
	}).catch((err)=>{
		res.send("failure");
	});
});


/**
 * 
 */
router.get('/category/:boardCategory', (req, res) => {
	let result        = {},
		boardCategory = validator.isInt(req.params.boardCategory) ? req.params.boardCategory : 1,
		limit         = (req.query.rowNum) ? 
						parseInt(req.query.rowNum, 10) : 10,
		offSet        = (req.query.pageNo) ?
				        (parseInt(req.query.pageNo, 10) === 1 ? 1 : (parseInt(req.query.pageNo, 10) - 1) * limit + 1) : 1,
		columns       = ["board_id", "board_subject", "board_contents", "user_id", "createdAt", "updatedAt"],
		where         = { use_yn: 1 };

	logger.debug(`Pagination Info => Limit : ${limit} // Offset : ${offSet}`);
	let boardQueryOp = {
		'where' : where,
		'attributes' : columns,
		'include' : [
			{
				model: models.BoardCategory,
				attributes: ["board_category","board_name"],
				required : true,
				where : {
					'board_category' : boardCategory
				}
			}
		],
		'benchmark' : true,
		'offset' : offSet,
		'limit' : limit,
		'order' : [['board_id', 'DESC']]
	}

	models.Board.findAll(boardQueryOp)
	.then((results) => {
		result['board'] = results;
		return models.Board.count({
			'where' : { 'board_category' : boardCategory }
		})
	})
	.then((results) => {
		result['cnt'] = results;
		res.json(result);
	})
	.catch((err) => {
		logger.info(`${err.message}`);
		res.send("failure");
	})
});

router.get('/view/:boardId', (req,res) => {
	let boardId = req.params.boardId,
		where = {
			'use_yn': 1,
			'board_id' : boardId
		}
		columns = ["board_id", "board_subject", "board_contents", "user_id", "createdAt", "updatedAt"];
		findOp = {
			'where' : where,
			'attributes' : columns,
		};

	models.Board.findOne(findOp)
	.then((result) => {
		logger.debug(result);
		res.json(result);
	})
	.catch((err) => {
		logger.error(`${err.message}`);
		res.send("failure");		
	});
});

router.post('/write', (req,res) => {
	logger.info("multiple rows write test");
	res.json(req.body);
})


module.exports = router;