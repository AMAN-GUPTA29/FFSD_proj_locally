const sqlite3 = require("sqlite3");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const sendIndex = require("./jsData/indexCardDetails");
const cardDetails = require("./jsData/customerViewData");
const sellerTransactions = require("./jsData/sellerTransactions");
const mongoose = require("mongoose");
const myModels = require("./mongooseUtil/models.js");
const myAPI = require("./mongooseUtil/api.js");
const uri = require("./mongooseUtil/mongo_pass.js");
const session = require("express-session");


const databasePath = path.join(__dirname, "data", "database.db");
const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.log("Error : " + err.message);
    return;
  }
  console.log("Database Connected !!!");
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Mongoose Connected !!!"))
  .catch((err) => {
    console.log("FAILED TO CONNECT !!!");
    console.log(err);
  });

// let query = "create table seller(id int, name varchar(50), email varchar(50) primary key, password varchar(25), loggedin int)";
// db.run(query, (err) => {
//     console.log(err)
// })

// db.run("drop table register", err => {
//     console.log(err)
// })

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: "keyy that will sign cookie",
    resave: false,
    saveUninitialized: false,
    name: "sessionID",
    cookie: {
      expires: 60000,
    },
  })
);

app.listen(8000);
console.log("Listening to : http://localhost:8000/");

// http://localhost:8000/images/crousal1.jpeg

const redirectLogged = (req, res, next) => {
  if (req.session.userID && req.session.customer) {
    res.redirect("/customerView");
  } else if (req.session.userID && req.session.seller) {
    res.redirect("/seller/sellerView");
  } else {
    next();
  }
};

app.get("/", redirectLogged, (req, res) => {
  //   req.session.isAuth = true;
  //   console.log(req.session);
  //   console.log(req.session.id);
  res.render("index", sendIndex);
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/login", redirectLogged, (req, res) => {
  res.render("login");
});

app.get("/details", (req, res) => {
  res.end("<h1>Register First</h1>");
});

app.post("/details", (req, res) => {
  console.log(req.body);
  res.render("details");
});

const redirectUnLoggedCustomer = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect("/login");
  } else if (req.session.seller) {
    res.redirect("/seller/sellerView");
  } else {
    next();
  }
};

app.get("/customerView", redirectUnLoggedCustomer, (req, res) => {
  // res.end("<h1>Login First</h1>")
  res.render("customerView", cardDetails);
});

app.get("/profile", redirectUnLoggedCustomer, (req, res) => {
  res.render("profile");
});

app.post("/welcome", (req, res) => {
  // console.log(req.body)
  // var rrr = res;
  // let query = `insert into register(id, name, email, password, loggedin) values(${Date.now()}, "${req.body.name}", "${req.body.email}", "${req.body.password}", 1)`
  // db.run(query, (err) => {
  //     if(err) {
  //         console.log(err)
  //         res.send("<h1>Email already taken !!!")
  //     }else{
  //         res.redirect('/customerView')
  //     }
  // })

  let instance = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  myAPI
    .save(myModels.customerModel, instance)
    .then((doc) => {
      console.log(doc._id);
      req.session.userID = doc._id;
      req.session.customer = true;
      req.session.seller = false;
      res.redirect("/customerView");
    })
    .catch(res.send("<h1>Email already taken !!! </h1>"));
});

app.post("/getin", (req, res) => {
  // console.log(req.body)
  // let query = `select * from register where email='${req.body.email}' and password='${req.body.password}'`
  // db.all(query, [], (err, rows) => {
  //     if(err){
  //         console.log(err)
  //     }else{
  //         let count = 0;
  //         rows.forEach(element => {
  //             count++;
  //         });
  //         if(count == 0){
  //             res.send("<h1>Either Id or Password or both are incorrect !!! </h1>")
  //         }else{
  //             res.redirect('/customerView')
  //         }
  //     }
  // })
  let email1 = req.body.email;
  let password1 = req.body.password;

  myModels.customerModel
    .find({ email: email1, password: password1 })
    .then((data) => {
      console.log(`ID = `, data[0]._id);
      req.session.userID = data[0]._id;
      req.session.customer = true;
      req.session.seller = false;
      res.redirect("/customerView");
    })
    .catch((err) => {
      console.log(err.message);
      res.send("<h1>Either Id or Password or both are incorrect !!! </h1>");
    });
});

// app.post('/seller/welcome', (req, res) => {
//     // console.log(req.body)
//     var rrr = res;
//     let query = `insert into seller(id, name, email, password, loggedin) values(${Date.now()}, "${req.body.name}", "${req.body.email}", "${req.body.password}", 1)`
//     db.run(query, (err) => {
//         if(err) {
//             console.log(err)
//             res.send("<h1>Email already taken !!!")
//         }else{
//             res.redirect('/seller/sellerView')
//         }
//     })
//

const redirectUnLoggedSeller = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect("/seller/login");
  } else if (req.session.customer) {
    res.redirect("/customerView");
  } else {
    next();
  }
};

app.post('/seller/xtraDetails', (req, res) => {
  console.log(req.body);
  // res.end("<h1>OK</h1>")
  let instance = {
    aadhar : req.body.aadhar,
    phone : req.body.phone,
    address : req.body.address,
    pointer : req.session.userID
  }
  myAPI.save(myModels.sellerDetail, instance)
  .then(doc => {
    console.log(doc.populate("pointer"));
    res.redirect("/seller/sellerView");
  })
  .catch(e => console.log(e))
})

app.post("/seller/welcome", (req, res) => {
  console.log(req.body);
  instance = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  myAPI
    .save(myModels.sellerModel, instance)
    .then(doc => {
      console.log(doc._id);
      req.session.userID = doc._id;
      req.session.customer = false;
      req.session.seller = true;
      // res.redirect("/seller/sellerView")
      res.render('seller/extraDetails')
    })
    .catch((err) => {
      console.log(err);
      res.send("<h1>Email already taken!!</h1>");
    });
});

app.post("/seller/getin", (req, res) => {
  // console.log(req.body);

  let email1 = req.body.email;
  let password1 = req.body.password;
  myModels.sellerModel
    .find({ email: email1, password: password1 })
    .then((data) => {
      console.log("ID =" + data[0]._id);
      req.session.userID = data[0]._id;
      req.session.customer = false;
      req.session.seller = true;
      res.redirect("/seller/sellerView");
    })
    .catch((err) => {
      console.log(err);
      res.send("<h1>  Either Id or Password or both are incorrect !!! </h1>");
    });

  // let query = `select * from seller where email='${req.body.email}' and password='${req.body.password}'`
  // db.all(query, [], (err, rows) => {
  //     if(err){
  //         console.log(err)
  //     }else{
  //         let count = 0;
  //         rows.forEach(element => {
  //             count++;
  //         });
  //         if(count == 0){
  //             res.send("<h1>Either Id or Password or both are incorrect !!! </h1>")
  //         }else{
  //             res.redirect('/seller/sellerView')
  //         }
  //     }
  // })
});

app.get("/customerView/display", redirectUnLoggedCustomer, (req, res) => {
  res.render("display");
});

app.get("/transaction", redirectUnLoggedCustomer, (req, res) => {
  res.render("transaction");
});

app.get("/payment", redirectUnLoggedCustomer, (req, res) => {
  res.render("payment");
});

app.get("/chat", (req, res) => {
  // res.end(`<body style='background: green;'><h1 style='color: white;'> Chat </h1></body>`)
  res.render("utils/chat");
});

// app.get("/sellerLogin", (req, res) => {
//     res.render('seller/login')
// })
app.get("/seller/login", redirectLogged, (req, res) => {
  res.render("seller/login");
});

app.get("/seller/register", redirectLogged, (req, res) => {
  res.render("seller/register");
});

app.get("/seller/sellerView", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/sellerView", sellerTransactions);
});

app.post("/seller/sellerView", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/sellerView", sellerTransactions);
});

app.get("/seller/services", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/services");
});

app.get("/seller/reviews", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/reviews");
});

app.get("/seller/profile", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/profile");
});

app.get("/seller/transactions", redirectUnLoggedSeller, (req, res) => {
  res.render("seller/transaction", sellerTransactions);
});

app.get("/logout", (req, res) => {
  if (req.session.userID) {
    res.clearCookie("sessionID")
    res.redirect("/")
  } else {
    res.redirect("/")
  }
});

// db.all("Select * from seller", (err, row) => {
//     if(err) {
//         console.log(err)
//     }else {
//         row.forEach(element => {
//             console.log(element);
//         });
//     }
// })
// console.log(Date.now())


async function run() {
  const data = await myModels.sellerDetail.where("pointer").equals("643aeb1a8e8a1c16a1bdeccc").populate("pointer");
  console.log(data)
}

run()