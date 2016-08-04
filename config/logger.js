const winston = require('winston');
const util = require('util');
const logger = new winston.Logger();
const configObj = {};

const fullDateStr = () => {
	let now    = new Date();
	let year   = "" + now.getFullYear();
	let month  = "" + (now.getMonth() + 1); if (month.length == 1)  { month  = "0" + month;  }
	let day    = "" + now.getDate();        if (day.length == 1)    { day    = "0" + day;    }
	let hour   = "" + now.getHours();       if (hour.length == 1)   { hour   = "0" + hour;   }
	let minute = "" + now.getMinutes();     if (minute.length == 1) { minute = "0" + minute; }
	let second = "" + now.getSeconds();     if (second.length == 1) { second = "0" + second; }
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


const logFormat = {
	timestamp: function () {
		return fullDateStr();
	},
	// Return string will be passed to logger.
	formatter: function (options) {
		// return `[${options.level.toUpperCase()}][${options.timestamp()}] : ${(undefined !== options.message ? options.message : '')}`
		return `[${options.level.toUpperCase()}][${options.timestamp()}] : ${(undefined !== options.message ? options.message : '')} ${(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )}`
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

let defaultLogger = (level, logObj) => {
	let logObjType = (typeof logObj),
		rtnLogMsg = '';
	try {
		if (logObjType === "object") {
			rtnLogMsg = Array.isArray(logObj) ? 
						`[Arrays Object Variable] ${logObj.toString()}` : `[Native Object Variable] ${logObj.toString()}`
		} else {
			rtnLogMsg = logObj.toString();		
		}
	} catch (err) {
		rtnLogMsg = `${err.name}::${err.message}`;
	}
	return logger.log(level, '%s', rtnLogMsg);

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

