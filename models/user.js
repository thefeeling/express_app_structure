'use strict';

module.exports = function (sequelize, DataTypes) {
	let User = sequelize.define('User', 
	{
		user_id : { 
			type : DataTypes.INTEGER,
			primaryKey : true,
			autoIncrement : true 
		},
		email : { 
			type : DataTypes.STRING(50),
			allowNull : false,
			unique : true,
			comment : "계정_이메일"
		},
		password : { 
			type : DataTypes.STRING(96),
			allowNull : false
		}
	}, 
	{
		tableName: 'user',
		paranoid: true,
		freezeTableName: true,
		timestamps: true
	});

	return User;
};