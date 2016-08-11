const logger = require('../../config/logger');


const httpRouteInfo = (req, res, next) => {
	let paramTxt     = '',
		routeInfo    = '',
		method       = req.method.toUpperCase(),
		tmpTargetObj = (method === "POST") ? req.body : req.query;


	if(Object.keys(tmpTargetObj).length){
		for (let key in tmpTargetObj) {
			paramTxt += `- ${key.toString()} : ${tmpTargetObj[key]}\n\t`
		}
		paramTxt = `${((method === "POST") ? "[BODY]" : "[QUERY]")}\n\t${paramTxt}`
	}

	routeInfo = `
	[Common Routing Info]
	-----------------------------
	[IP]           : ${req.ip}
	[PROTOCOL]     : ${req.protocol} 
	[HTTP METHOD]  : ${req.method}
	[CONTENT-TYPE] : ${req.get('Content-Type')}
	[PATH]         : ${req.path}
	[ORIGIN-URL]   : ${req.originalUrl}
	[XHR_YN]       : ${req.xhr}
	${paramTxt}
	`
	logger.debug(routeInfo);
	next();
}

module.exports = httpRouteInfo;