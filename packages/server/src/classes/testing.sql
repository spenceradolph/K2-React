DROP DATABASE islandrushdb;
CREATE DATABASE islandrushdb;
USE islandrushdb;

SELECT * FROM games;

-- UPDATE games SET gameActive = 1 WHERE gameId = 1;

INSERT INTO games (gameSection, gameInstructor, gameAdminPassword, gameActive, gameBlueJoined, gameRedJoined) VALUES ('m1a1', 'adolph', '912ec803b2ce49e4a541068d495ab570', 1, 0, 0); 
