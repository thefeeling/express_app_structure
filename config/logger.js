const winston = require('winston');
const logger = new winston.Logger();
const configObj = {};


switch (process.env.NODE_ENV) {
	case 'production':
		break;
	default:
		configObj.level = 'info';
		configObj.transports = [
			new (winston.transports.Console)()
		];
		break;
};

logger.configure(configObj);


let defaultLogger = (level, logStr) => {
	return logger.log(level, '[%s] %s', level.toUpperCase(), logStr);
}

module.exports = {
	info : (infoStr) => {
		return defaultLogger('info', infoStr);
	},
	debug : (infoStr) => {
		return defaultLogger('debug', infoStr);
	},
	error : (infoStr) => {
		return defaultLogger('error', infoStr);
	}
};

