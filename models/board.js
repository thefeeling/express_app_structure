'use strict';
var models = require('./index');


module.exports = (sequelize, DataTypes)=>{
	let Board = sequelize.define('Board', 
	{
		board_id : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			autoIncrement : true 
		},
		board_category : {
			type : DataTypes.INTEGER,
			allowNull: false
			//,
			//references: {
			//	model: models.BoardCategory, 
			//	key: 'board_category'
			//}
		},		
		board_subject : {
			type : DataTypes.STRING(50),
			allowNull : false
		},		
		board_contents : {
			type : DataTypes.STRING(1500),
			allowNull : false,
			comment : ""
		},
		user_id : {
			type : DataTypes.INTEGER
		},
		use_yn   : {
			type : DataTypes.BOOLEAN,
			allowNull : false
		}
	}, 
	{
		tableName: 'board',
		paranoid: true,
		freezeTableName: true,
		timestamps: true
	});
	return Board;
};