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
    high_score INT NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE countries (
    id INT GENERATED ALWAYS AS IDENTITY,
    country_id CHAR(2) NOT NULL,
    name VARCHAR(100) NOT NULL,
    funfact VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO countries (country_id, name, funfact) VALUES
('AL', 'Albania', 'Albania has a coastline along both the Adriatic and Ionian Seas.'),
('AD', 'Andorra', 'Andorra is located in the Pyrenees mountains between France and Spain.'),
('AM', 'Armenia', 'Armenia is one of the world’s oldest countries, with Yerevan founded in 782 BC.'),
('AT', 'Austria', 'Austria is famous for its classical music heritage, being home to Mozart.'),
('BE', 'Belgium', 'Belgium is known for its chocolate, beer, and being the HQ of the EU.'),
('BG', 'Bulgaria', 'Bulgaria is home to one of the world’s oldest known gold treasures.'),
('BA', 'Bosnia and Herzegovina', 'Bosnia has the last remaining jungle in Europe, Perućica.'),
('BY', 'Belarus', 'Belarus is called "Europe’s last dictatorship" and is landlocked.'),
('CH', 'Switzerland', 'Switzerland is famous for its neutrality and banking system.'),
('CZ', 'Czech Republic', 'The Czech Republic has over 2,000 castles, more than any other country in Europe.'),
('DE', 'Germany', 'Germany is the birthplace of both the printing press and the automobile.'),
('DK', 'Denmark', 'Denmark consistently ranks among the world’s happiest countries.'),
('EE', 'Estonia', 'Estonia is a leader in digital governance and was the first country to offer e-residency.'),
('FI', 'Finland', 'Finland is known as the land of a thousand lakes, though it actually has around 188,000.'),
('GB', 'United Kingdom', 'The UK is made up of four countries: England, Scotland, Wales, and Northern Ireland.'),
('GE', 'Georgia', 'Georgia is considered the birthplace of wine, with winemaking traditions dating back 8,000 years.'),
('GR', 'Greece', 'Greece is the birthplace of democracy and the Olympic Games.'),
('HR', 'Croatia', 'Croatia has over 1,200 islands, islets, and reefs along its coastline.'),
('HU', 'Hungary', 'Hungary has the largest thermal water cave system in the world.'),
('IE', 'Ireland', 'Ireland is known as the Emerald Isle due to its lush green countryside.'),
('IS', 'Iceland', 'Iceland has no standing army, navy, or air force.'),
('IT', 'Italy', 'Italy is home to the most UNESCO World Heritage sites in the world.'),
('LI', 'Liechtenstein', 'Liechtenstein has more registered companies than citizens.'),
('LT', 'Lithuania', 'Lithuania was the first Soviet republic to declare independence in 1990.'),
('LU', 'Luxembourg', 'Luxembourg is one of the world’s smallest countries but one of the richest per capita.'),
('LV', 'Latvia', 'Latvia is one of the greenest countries in Europe, with over half its territory covered by forests.'),
('MD', 'Moldova', 'Moldova is one of the least visited countries in the world.'),
('MK', 'Macedonia', 'Macedonia’s Lake Ohrid is one of Europe’s oldest and deepest lakes.'),
('ME', 'Montenegro', 'Montenegro means "Black Mountain" in Italian.'),
('NL', 'Netherlands', 'The Netherlands is famous for its windmills, tulips, and canals.'),
('NO', 'Norway', 'Norway has some of the longest road tunnels in the world.'),
('PL', 'Poland', 'Poland is home to the world’s largest castle, Malbork Castle.'),
('PT', 'Portugal', 'Portugal is the oldest country in Europe with the same borders since 1139.'),
('RO', 'Romania', 'Romania is home to the legendary Dracula’s Castle in Transylvania.'),
('RS', 'Serbia', 'Serbia is known for its lively nightlife and floating river clubs on the Danube.'),
('SK', 'Slovakia', 'Slovakia has more than 6,000 caves beneath its mountains.'),
('SI', 'Slovenia', 'Slovenia is the only country with “love” in its name.'),
('SE', 'Sweden', 'Sweden is the birthplace of the Nobel Prize.'),
('TR', 'Turkey', 'Istanbul, Turkey, is the only city in the world that spans two continents.');
