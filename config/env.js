let appInit = {};

/**
 * [APP INIT PARAMETERS] BY KSCHOI
 */
switch(process.env.NODE_ENV) {
	case 'production':
		// GLOBAL
		appInit.APP_PORT       = 80;
		appInit.APP_LOG_LEVEL  = "dev";

		// REDIS
		appInit.APP_REDIS_HOST = "192.168.56.101";

		// MYSQL
		appInit.DB_HOST      = 'localhost'
		appInit.DB_DATABASE  = 'daniel_comm'
		appInit.DB_ID        = 'root'
		appInit.DB_PW        = '1234'
		appInit.DB_POOL_MAX  = 5;
		appInit.DB_POOL_MIN  = 1;
		appInit.DB_POOL_IDLE = 10;

		break;
	case 'development':
		// GLOBAL
		appInit.APP_PORT       = 52002;
		appInit.APP_LOG_LEVEL  = "dev";

		// REDIS
		appInit.APP_REDIS_HOST = "192.168.56.101";

		// MYSQL
		appInit.DB_HOST      = 'localhost'
		appInit.DB_DATABASE  = 'daniel_comm'
		appInit.DB_ID        = 'root'
		appInit.DB_PW        = '1234'
		appInit.DB_POOL_MAX  = 5;
		appInit.DB_POOL_MIN  = 1;
		appInit.DB_POOL_IDLE = 10;

		break;
	default:
		// GLOBAL
		appInit.APP_PORT       = 8888;
		appInit.APP_LOG_LEVEL  = "dev";

		// REDIS
		appInit.APP_REDIS_HOST = "192.168.56.101";

		// MYSQL
		appInit.DB_HOST      = 'localhost'
		appInit.DB_DATABASE  = 'daniel_comm'
		appInit.DB_ID        = 'root'
		appInit.DB_PW        = '1234'
		appInit.DB_POOL_MAX  = 5;
		appInit.DB_POOL_MIN  = 1;
		appInit.DB_POOL_IDLE = 10;



		break;
};
module.exports = appInit;
