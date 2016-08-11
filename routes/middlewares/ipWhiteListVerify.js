const logger = require('../../config/logger');


/**
 * [IP WHITE LIST]
 */
const whiteList = (req, res, next) => {
	next();
}

module.exports = whiteList;