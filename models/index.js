let fs = require('fs');
let path = require('path');
let ENV = require('../config/env');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(ENV.DB_DATABASE, ENV.DB_ID, ENV.DB_PW, {
	host: ENV.DB_HOST,
	dialect: 'mysql',
	pool: {
		max: ENV.DB_POOL_MAX,
		min: ENV.DB_POOL_MIN,
		idle: ENV.DB_POOL_IDLE
	}
});
let db = {};

fs.readdirSync(__dirname)
.filter(function (file) {
	return (file.indexOf('.') !== 0) && (file !== 'index.js' && file !== 'config.js');
})
.forEach(function (file) {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;

	// 강제로 삭제 후 생성
	// Dev/Pro 분기 처리해야 함.
	db[model.name].sync({force:true});
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;


/*
let User = sequelize.define('user', {
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});
*/

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
