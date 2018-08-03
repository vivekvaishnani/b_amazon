DROP DATABASE IF EXISTS b_amazon;

CREATE DATABASE b_amazon;

USE b_amazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  product_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics","Charger", 4.00, 10);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics","PhoneCase", 8.00, 15);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Food & Grocery","Olive oil", 8.00, 20);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Food & Grocery","Flour", 3.00, 20);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Food & Grocery","Granola Bar", 2.00, 25);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Clothing","Shirts", 20.00, 30);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Clothing","Pants", 22.00, 30);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Clothing","Jacket", 30.00, 35);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Footwear","Running Shoes", 40.00, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Footwear","Flip flop", 10.00, 100);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);