var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as:" + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        promptUser()
    });
}

function promptUser() {
    inquirer.prompt([{
            name: "products",
            type: "input",
            message: "What are you looking for?",
            choices: function () {
                var choicesArray = [];
                for (var i = 0; i < results.length; i++) {
                    choicesArray.push(results[i].product_name);
                }
                return choicesArray;
            },
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like?"
        }
    ]).then(function (answer) {
        var pickedProduct;
        for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.products) {
                pickedProduct = results[i];
            }
        }

        if (pickedProduct.stock_quantity > parseInt(answer.amount)) {
            connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: pickedProduct.stock_quantity - parseInt(answer.amount)
                },
                {
                    id: pickedProduct.id
                }], function (error) {
                    if (error) throw err;

                    console.log("Item: " + pickedProduct.product_name);
                    console.log("Quantity: " + parseInt(answer.amount));
                    console.log("_____________________________");
                    console.log("Total: " + "$" + (pickedProduct.price * parseInt(answer.amount)));
                    display();
                    run();
                })
        } else {
            console.log("Not in Stock");
            display();
            run();
        }
    });
}