let ENV = require('./env');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(ENV.DB_DATABASE, ENV.DB_ID, ENV.DB_PW, {
	host    : ENV.DB_HOST,
	dialect : 'mysql',
	pool    : {
		max  : ENV.DB_POOL_MAX,
		min  : ENV.DB_POOL_MIN,
		idle : ENV.DB_POOL_IDLE
	}	
});

let User = sequelize.define('user', {
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});

/*sequelize.sync().then(function () {
	return User.create({
		username: 'janedoe',
		birthday: new Date(1980, 6, 20)
	});
}).then(function (jane) {
	console.log(jane.get({
		plain: true
	}));
});*/
console.log('database init!!!!!!!!!!');

module.exports = sequelize;