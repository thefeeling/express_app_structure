'use strict';

module.exports = (sequelize, DataTypes)=>{
	let boardCategory = sequelize.define('BoardCategory', 
	{
		board_category : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		p_board_category : {
			type : DataTypes.INTEGER
		},		
		board_name : {
			type : DataTypes.STRING(25),
			allowNull : false,
			comment : "게시판 이름"
		},
		use_yn : {
			type : DataTypes.BOOLEAN                     ,
			allowNull : false
		}
	}, 
	{
		tableName: 'boardcategory',
		paranoid: true,
		freezeTableName: true,
		timestamps: true
	});
	return boardCategory;
};