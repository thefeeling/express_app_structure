let appInit = {};

/**
 * [APP INIT PARAMETERS] BY KSCHOI
 */
switch(process.env.NODE_ENV) {
	case 'production':
		appInit.APP_PORT = 80;
		appInit.APP_LOG_LEVEL = "dev";
		appInit.APP_REDIS_HOST = "192.168.56.101";
		break;
	case 'development':
		appInit.APP_PORT = 52002;
		appInit.APP_LOG_LEVEL = "dev";
		appInit.APP_REDIS_HOST = "192.168.56.101";
		break;
	default:
		appInit.APP_PORT = 8888;
		appInit.APP_LOG_LEVEL = "dev";
		appInit.APP_REDIS_HOST = "192.168.56.101";
		break;
};
module.exports = appInit;
