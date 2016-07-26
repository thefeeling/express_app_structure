let env = require('./config/env');
let express = require('express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let redis = require('redis');
let redisStore = require('connect-redis')(session);
let client = redis.createClient({
	host: env.APP_REDIS_HOST
});

// sequelize
var models = require('./models');



function whiteList(req, res, next) {
	console.log(req.ip);
	next();
}

// config
app.use(whiteList);
app.use(logger(env.APP_LOG_LEVEL));
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
	resave: false, // don't save session if unmodified,
	cookie: { expires: true, maxAge: 5 * 60 * 1000 }
}));



// routes
app.use('/content', require('./routes/content'));
app.use('/mypage', require('./routes/mypage'));
app.use('/user', require('./routes/user'));



app.listen(env.APP_PORT, function () {
	console.log(`Express Folder Structure App Init Port : ${env.APP_PORT}`);
});
