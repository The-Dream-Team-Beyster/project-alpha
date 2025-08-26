DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS countries;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (100) NOT NULL,
    score VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE countries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    funfact TEXT
);

INSERT INTO countries (name, funfact) VALUES
('Albania', 'Albania has a coastline along both the Adriatic and Ionian Seas.'),