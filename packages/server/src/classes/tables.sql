-- This file contains the database table creations

CREATE TABLE IF NOT EXISTS games (
	gameId INT(3) PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    gameSection VARCHAR(16) NOT NULL,  -- ex: M1A1
    gameInstructor VARCHAR(32) NOT NULL, -- ex: Adolph
    
    gameAdminPassword VARCHAR(32) NOT NULL, -- MD5 Hash
    gameActive INT(1) NOT NULL DEFAULT 0, -- 0 inactive, 1 active

    gameBlueJoined INT(1) NOT NULL DEFAULT 0, -- 0 not joined, 1 joined
    gameRedJoined INT(1) NOT NULL DEFAULT 0
) AUTO_INCREMENT=1;
