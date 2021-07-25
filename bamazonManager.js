var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "password",
    database: "bamazon",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as thread id " + connection.threadId);
    manaView();
});

function manaView() {
    inquirer
        .prompt({
            name: "manaList",
            type: "list",
            message: "Select an option:",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then(function (answer) {
            switch (answer.manaList) {
                case "View Products for Sale":
                    productSearch();
                    break;

                case "View Low Inventory":
                    viewInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        })
}

function productSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("ID | Product Name | Department Name | Price | Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------");
    });
}

function viewInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    console.log("ID | Product Name | Department Name | Price | Quantity");
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------");
    });
}

function addInventory() {
    inquirer
    .prompt([{
        name: "addInven",
        type: "input",
        message: "Provide the Item ID for the product you would like to add inventory to."
    },
    {
        name: "invenNum",
        type: "input",
        message: "How many would you like to add to the quantity of this product?"
    }
    ]).then(function(answer) {
        let addedStock = Number(answer.invenNum);
        var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?";
        connection.query(query, [addedStock, {item_id: answer.addInven}], function(err, res) {
            console.log("Added " + addedStock + " of Item ID " + answer.addInven + ".");
        });
    });
}

function addProduct() {
    inquirer
        .prompt([{
            name: "prodName",
            type: "input",
            message: "What's the name of the product you like to add?"
        },
            {
                name: "departName",
                type: "input",
                message: "What department does this product belong in?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does this product cost? (no dollar/cents sign needed)"
            },
            {
                name: "stock",
                type: "input",
                message: "How many of this product are we adding? (only whole number accepted)"
            }]).then(function (answer) {
                var query = "INSERT INTO products SET ?";
                connection.query(query,
                    {
                        product_name: answer.prodName,
                        department_name: answer.departName,
                        price: answer.price,
                        stock_quantity: answer.stock
                    },
                    function (err, res) {
                        console.log("Product has been added to inventory");
                    });
            });
}