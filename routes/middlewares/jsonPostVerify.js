const logger = require('../../config/logger');

const jsonPostVerify = (req, res, next) => {
	try {
		let method = req.method.toUpperCase(),
			acceptContentType = req.accepts('application/json'),
			contentTypeJsonYn = req.is('application/json');

		let checkHeaderInfo = (method === "POST" && acceptContentType && contentTypeJsonYn);
		
		logger.info(`application/json & POST Check : ${checkHeaderInfo}`);

		if (checkHeaderInfo) {
			next();
		} else {
			throw new Error("invalid HTTP Header Info");
		}
	} catch (err) {
		logger.debug(`${err.message}`)
		next({});
	}
}

module.exports = jsonPostVerify;