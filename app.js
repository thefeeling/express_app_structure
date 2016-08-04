let env = require('./config/env');
let logger = require('./config/logger');
let express = require('express');
let app = express();
let httpLogger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let redis = require('redis');
let redisStore = require('connect-redis')(session);
let client = redis.createClient({
	host: env.APP_REDIS_HOST
});
let models = require('./models'); // sequelize

app.use(httpLogger(env.APP_LOG_LEVEL));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);
app.use(express.static('public'));


// redis test
app.use(session({
	secret: 'secret_key',
	store: new redisStore({
		host: env.APP_REDIS_HOST,
		port: 6379,
		client: client,
		prefix: "session:",
		db: 0
	}),
	saveUninitialized: false, // don't create session until something stored,
	resave: false,            // don't save session if unmodified,
	cookie: { expires: true, maxAge: 5 * 60 * 1000 }
}));

// routes/index.js all routes load
app.use('', require('./routes'));




app.listen(env.APP_PORT, function () {
	logger.info(`Express Folder Structure App Init Port : ${env.APP_PORT}`);
});
