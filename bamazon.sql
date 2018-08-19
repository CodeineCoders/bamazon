DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;
USE bamazondb

CREATE TABLE products(
    ID INIT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR() NOT NULL,
    department_name VARCHAR() NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INIT NOT NULL
);

