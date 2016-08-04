/**
 * Model add && DB Connect
 */
const fs = require('fs');
const path = require('path');
const config = require('./config');
const ENV = require('../config/env');
const logger = require('../config/logger');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(ENV.DB_DATABASE, ENV.DB_ID, ENV.DB_PW, {
	host: ENV.DB_HOST,
	logging : (queryStr) => {
		return logger.info(queryStr);
	},
	dialect: 'mysql',
	pool: {
		max: ENV.DB_POOL_MAX,
		min: ENV.DB_POOL_MIN,
		idle: ENV.DB_POOL_IDLE
	},
	benchmark : true
});
const db = {};

fs.readdirSync(__dirname)
.filter((file)=>{
	return (file.indexOf('.') !== 0) && (file !== 'index.js' && file !== 'config.js' && file !== 'sqlmap');
})
.forEach((file)=>{
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;

	// 강제로 삭제 후 생성
	// Dev/Pro 분기 처리해야 함.
	// db[model.name].sync({force:true});
});

/*
Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
*/

setTimeout(function(){
	config.initAssociations(db);
},2000);


db.rawQuery = {
	select : (sql, params) => {
		try {
			if(!sql || !(typeof sql === "string")){
				throw new Error("rawQuery::Empty SQL or No SQL Statement")
			}

			if(!params){
				params = {};
				logger.info("rawQuery Execution -> Null Or Undefined Params");
			}
			
			// Return Promise
			return sequelize.query(sql, {
				replacements : params, 
				type: sequelize.QueryTypes.SELECT
			});			
		} catch (err) {
			logger.error(`${err.message}`);
			return Promise.reject();
		}
	}
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;