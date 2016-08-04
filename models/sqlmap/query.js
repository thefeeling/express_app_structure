const queryMap = {
	rawQueryTest :
		`
		SELECT * 
		FROM board AS Board
		
		INNER JOIN user AS User 
		ON Board.user_id = User.user_id AND User.deletedAt IS NULL

		INNER JOIN boardcategory AS BoardCategory
		ON Board.board_category = BoardCategory.board_category AND BoardCategory.deletedAt IS NULL
		
		WHERE Board.deletedAt IS NULL
    	AND Board.use_yn = :use_yn
		LIMIT 1;
		`,
	validateQuery :
		`SELECT 1 FROM DUAL`
};

module.exports = queryMap;