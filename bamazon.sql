DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(10) NOT NULL,
    department_name VARCHAR(10) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

