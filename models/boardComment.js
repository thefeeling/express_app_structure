'use strict';
var models = require('./index');

module.exports = (sequelize, DataTypes)=>{
	let BoardComment = sequelize.define('BoardComment', 
	{
		comment_id : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			autoIncrement : true 
		},
		board_id : {
			type : DataTypes.INTEGER
		},
		user_id : {
			type : DataTypes.INTEGER
		},
		comment_contents : {
			type : DataTypes.STRING(500),
			allowNull: false
		},
		use_yn   : {
			type : DataTypes.BOOLEAN,
			allowNull : false
		}
	}, 
	{
		tableName: 'boardComment',
		paranoid: true,
		freezeTableName: true,
		timestamps: true
	});
	return BoardComment;
};