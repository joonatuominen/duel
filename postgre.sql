DROP TABLE game;

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    status INT NOT NULL
);

-- statuses for the game
-- 1: started
-- 1000: finished