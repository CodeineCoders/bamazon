var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as:" + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connect.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.log(res);
        promptUser()
    });
}

function promptUser(){
    inquirer.prompt([
        {
            name: "product",
            type: "list",
            choices: function() {
                var choicesArray = [];
                for (var i = 0; i < results.length; i++) {
                    choicesArray.push(results[i].product_name);
                }
                return choicesArray;
            },
            message: "What are you looking for?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like?"
        }
    ])
}