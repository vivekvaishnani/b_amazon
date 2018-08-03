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


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  productsForPurchase();
});



function productsForPurchase() {
 
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    for( i = 0 ; i < res.length ; i++){
    // console.log("List of Products...\n");
    // console.log(`------------\nID:${res[0].id}  Name: ${res[0].product_name} | Price:$${res[0].price}\nID:${res[1].id}   Name:${res[1].product_name}  Price:$${res[1].price}\nID:${res[2].id}   Name:${res[2].product_name}  Price:$${res[2].price}\nID:${res[3].id}   Name:${res[3].product_name}  Price:$${res[3].price}\nID:${res[4].id}   Name:${res[4].product_name}   Price:$${res[4].price}\nID:${res[5].id}   Name:${res[5].product_name}  Price:$${res[5].price}\nID:${res[6].id}   Name:${res[6].product_name}  Price:$${res[6].price}\nID:${res[7].id}   Name:${res[7].product_name}  Price:$${res[7].price}\nID:${res[8].id}   Name:${res[8].product_name}  Price:$${res[8].price}\nID:${res[9].id}   Name:${res[9].product_name}  Price:$${res[9].price}\n--------------`);
    
    console.log(`ID:${res[i].id}  Name: ${res[i].product_name} | Price:$${res[i].price}`);
    }
   makePurchse();
  });
}

function makePurchse(){
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

  inquirer
      .prompt([

        // {
        //   name: "choice",
        //   message: "What product would you like to purchase?",
        //   type: "checkbox",
        //   choices: function() {
        //     var choiceArray = [];
        //     for (var i = 0; i < res.length; i++) {
        //       choiceArray.push("ID: "+res[i].id +" | "+"Name: "+res[i].product_name +" | "+"Price: $"+res[i].price);
        //     }
        //     return choiceArray;
        //   }
          
        // },
        {
          name: "choice",
          type: "input",
          message: "Enter the id number of product you would like to purchase!"
        },
        {
          name: "purchase",
          type: "input",
          message: "Enter the quantity you would like to purchase?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        console.log(answer);
        
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].id);
          if (res[i].id === answer.choice) {
            chosenItem = res[i];
            console.log(chosenItem);
          }
        }

        // determine if have enough stock quantity
        if (chosenItem.stock_quantity <= parseInt(answer.purchase)) {
           var updatedStock = parseInt(chosenItem.stock_quantity - answer.purchase);
          // stock was enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedStock
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Item purchased successfully!");
              // makePurchse();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not Enough Stock");
          // makePurchse();
        }
      // }
      });
    });
  }
