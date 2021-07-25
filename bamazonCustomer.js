var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "password",
    database: "bamazon",
});

let purchasedItem;
let itemPrice;
let quantityAvailable;
let itemID;


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as thread id " + connection.threadId);
    queryInven();
});

function queryInven() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("ID | Product Name | Department Name | Price | Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------");
        purchase();
    })
};

function purchase() {
    inquirer
        .prompt({
            name: "itemID",
            type: "input",
            message: "Provide the ID for the product that you would like to purchase."
        })
        .then(function (answer) {
            var query = "SELECT * FROM products";
            connection.query(query, { item: answer.itemID }, function (err, res) {
                if (answer.itemID > res.length) {
                    console.log("Please come again when you know what you want");
                }
                else {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].item_id == answer.itemID) {
                            purchasedItem = res[i].product_name;
                            itemPrice = res[i].price;
                            quantityAvailable = res[i].stock_quantity;
                            itemID = res[i].item_id;
                            console.log("Product Name: " + purchasedItem + " | Quantity Available: " + quantityAvailable);
                        }
                    }
                    stockQuery();
                }
            });
        });
}

function stockQuery() {
    inquirer
        .prompt({
            name: "itemQuantity",
            type: "input",
            message: "How many of this product would you like to purchase?"
        })
        .then(function (answer) {
            if (Number(answer.itemQuantity) > Number(quantityAvailable)) {
                console.log("We're sorry, we have an insufficient quantity to what you require.");
            }
            else if (Number(answer.itemQuantity) === NaN) {
                console.log("Please enter a valid number and try again");
            }
            else {
                let newQuantity = quantityAvailable - answer.itemQuantity;
                let totalPrice = parseFloat(answer.itemQuantity) * parseFloat(itemPrice);
                console.log("The total price comes to $" + totalPrice + ". Thanks for shopping!");
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: itemID
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log("Quantity Updated!");
                    }
                )
            }
        });
}