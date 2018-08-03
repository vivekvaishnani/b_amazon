var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "b_amazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  productsForPurchase();
});



function productsForPurchase() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    console.log(`------------\nList of Products`)
    for (i = 0; i < res.length; i++) {
    // console.log(`\nID:${res[i].id}  Name: ${res[i].product_name} | Price:$${res[i].price}`);

    }
    console.log(`------------`)
    makePurchse();
  });
}

function makePurchse() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([

        {
          name: "choice",
          message: "What product would you like to purchase?",
          type: "checkbox",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push("Name: "+res[i].product_name +" | "+"Price: $"+res[i].price);
            }
            return choiceArray;
          }

        },
        // {
        //   name: "choice",
        //   type: "input",
        //   message: "Enter the id number of product you would like to purchase!"
        // },
        {
          name: "count",
          type: "input",
          message: "Enter the quantity you would like to purchase?",
          validate: (value => {
            for (var i = 0; i < res.length; i++){
            
            if (value < res[i].stock_quantity) {
              return true;
            }
            return `WE DON'T HAVE THAT MANY IN STOCK! PLEASE ENTER A NUMBER BELOW ${res[i].stock_quantity}`;
          }
          })
        }

      ])

      .then( function(answer) {
         
        for (var i = 0; i < res.length; i++){
        connection.query(`UPDATE products SET stock_quantity = '${(res[i].stock_quantity - answer.count)}' WHERE product_name = '${res[i].product_name}'`, ((err, res) => {
          if (err) throw (err);
          console.log(`Your purchase of ${answer.count} unit(s) of ${res[i].product_name} has been recoded! Your total is $${answer.count * res[i].price}`);
        }));
      }
      })

  });
}

      // .then(function (answer) {
      //   // get the information of the chosen item
      //   console.log(answer);

      //   var chosenItem;
      //   for (var i = 0; i < res.length; i++) {
      //     console.log(res[i].id);
      //     if (res[i].id === answer.choice) {
      //       chosenItem = res[i];
      //       console.log(chosenItem);
      //     }
      //   }

      //   // determine if have enough stock quantity
      //   if (chosenItem.stock_quantity <= parseInt(answer.purchase)) {
      //     var updatedStock = parseInt(chosenItem.stock_quantity - answer.purchase);
      //     // stock was enough, so update db, let the user know, and start over
      //     connection.query(
      //       "UPDATE products SET ? WHERE ?",
      //       [
      //         {
      //           stock_quantity: updatedStock
      //         },
      //         {
      //           id: chosenItem.id
      //         }
      //       ],
      //       function (error) {
      //         if (error) throw err;
      //         console.log("Item purchased successfully!");
      //         // makePurchse();
      //       }
      //     );
      //   }
      //   else {
      //     // bid wasn't high enough, so apologize and start over
      //     console.log("Not Enough Stock");
      //     // makePurchse();
      //   }
      //   // }
      // });

