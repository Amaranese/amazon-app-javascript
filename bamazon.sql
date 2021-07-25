DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY(item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Full Throttle", "Grocery", 2.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Origin", "Pets", 49.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Twizzlers", "Grocery", 1.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1Q 84", "Books", 32.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Programming for Dummies", "Books", 20.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Corsair Mech-Key-Red302", "Computer Hardware", 60.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Logitech G43 Speakers", "Computer Hardware", 50.99, 83);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Touch Genius 3021", "Computer Hardware", 1053.99, 41);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Genius 3021 portable charger", "Computer Hardware", 50.53, 41);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("J.I.D. - TheNevStr", "Music", 9.53, 5000);

SELECT * FROM products;