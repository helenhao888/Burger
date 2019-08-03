CREATE TABLE burgers
(id INT  AUTO_INCREMENT NOT NULL,
burger_name  VARCHAR(100) NOT NULL,
devoured BOOLEAN DEFAULT false,
createdAt TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);


INSERT INTO burgers(burger_name,devoured) VALUES("Chesse burger",true);
INSERT INTO burgers(burger_name,devoured) VALUES("Beef burger",false);
INSERT INTO burgers(burger_name,devoured) VALUES("Chicken burger",true);

