const winston = require('winston');
const logger = new winston.Logger();
const configObj = {};

const fullDateStr = () => {
	now    = new Date();
	year   = "" + now.getFullYear();
	month  = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	day    = "" + now.getDate();        if (day.length == 1) { day = "0" + day; }
	hour   = "" + now.getHours();       if (hour.length == 1) { hour = "0" + hour; }
	minute = "" + now.getMinutes();     if (minute.length == 1) { minute = "0" + minute; }
	second = "" + now.getSeconds();     if (second.length == 1) { second = "0" + second; }
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


const logFormat = {
	timestamp: function () {
		return fullDateStr();
	},
	// Return string will be passed to logger.
	formatter: function (options) {
		return `[${options.level.toUpperCase()}][${options.timestamp()}] : ${(undefined !== options.message ? options.message : '')}`
	}
}




switch (process.env.NODE_ENV) {
	case 'production':
		break;
	default:
		configObj.level = 'debug';
		configObj.transports = [
			new (winston.transports.Console)(logFormat)
		];
		break;
};

logger.configure(configObj);
let defaultLogger = (level, logStr) => {
	return logger.log(level, '%s', logStr);
}


module.exports = {
	info: (infoStr) => {
		return defaultLogger('info', infoStr);
	},
	debug: (infoStr) => {
		return defaultLogger('debug', infoStr);
	},
	error: (infoStr) => {
		return defaultLogger('error', infoStr);
	}
};

