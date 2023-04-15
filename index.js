const sqlite3 = require("sqlite3")
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const sendIndex = require('./jsData/indexCardDetails')
const cardDetails = require('./jsData/customerViewData')
const sellerTransactions = require('./jsData/sellerTransactions')
const mongoose = require('mongoose')
const myModels = require('./mongooseUtil/models.js')
const myAPI = require('./mongooseUtil/api.js')
const uri = require('./mongooseUtil/mongo_pass.js')



const databasePath = path.join(__dirname, 'data', 'database.db')
const db = new sqlite3.Database(databasePath, (err) => {
    if(err) {
        console.log("Error : " + err.message)
        return;
    }
    console.log("Database Connected !!!")
})


mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(console.log("Connected !!!"))
.catch(err => console.log(err))

// let query = "create table seller(id int, name varchar(50), email varchar(50) primary key, password varchar(25), loggedin int)";
// db.run(query, (err) => {
//     console.log(err)
// })

// db.run("drop table register", err => {
//     console.log(err)
// })

const app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))


app.listen(8000)
console.log("Listening to : http://localhost:8000/")

// http://localhost:8000/images/crousal1.jpeg


app.get('/', (req, res) => {
    res.render('index', sendIndex)
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/login', (req, res) => {
    res.render('login')
})



app.get('/details', (req, res) => {
    res.end("<h1>Register First</h1>")
})

app.post('/details', (req, res) => {
    console.log(req.body);
    res.render('details')
})

app.get('/customerView', (req, res) => {
    // res.end("<h1>Login First</h1>")
    res.render('customerView', cardDetails)
})

app.get('/profile', (req, res) => {
    res.render('profile')
})



app.post('/welcome', (req, res) => {
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
        userName : req.body.email,
        password : req.body.password
    }
    
    myAPI.save(myModels.customerModel, instance)
    .then(res.redirect('/customerView'))
    .catch(res.send("<h1>Email already taken !!! </h1>"))

})

app.post('/getin', (req, res) => {
    console.log(req.body)
    let query = `select * from register where email='${req.body.email}' and password='${req.body.password}'`
    db.all(query, [], (err, rows) => {
        if(err){
            console.log(err)
        }else{
            let count = 0;
            rows.forEach(element => {
                count++;
            });
            if(count == 0){
                res.send("<h1>Either Id or Password or both are incorrect !!! </h1>")
            }else{
                res.redirect('/customerView')
            }
        }
    })

})

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
app.post('/seller/welcome', (req, res)=>{
    console.log(req.body)
 instance = {
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
 }
 myAPI.save(myModels.sellerModel, instance)
 .then (res.redirect('/seller/sellerView'))
 .catch((err)=>{
    console.log(err)
    res.send("<h1>Email already taken!!</h1>")
 })

})

app.post('/seller/getin', (req, res) => {
    console.log(req.body)
    let query = `select * from seller where email='${req.body.email}' and password='${req.body.password}'`
    db.all(query, [], (err, rows) => {
        if(err){
            console.log(err)
        }else{
            let count = 0;
            rows.forEach(element => {
                count++;
            });
            if(count == 0){
                res.send("<h1>Either Id or Password or both are incorrect !!! </h1>")
            }else{
                res.redirect('/seller/sellerView')
            }
        }
    })

})

app.get('/customerView/display', (req, res) => {
    res.render('display')
})

app.get('/transaction', (req, res) => {
    res.render('transaction')
})

app.get('/payment', (req, res) => {
    res.render('payment')
})

app.get('/chat', (req, res) => {
    // res.end(`<body style='background: green;'><h1 style='color: white;'> Chat </h1></body>`)
    res.render('utils/chat')
})



// app.get("/sellerLogin", (req, res) => {
//     res.render('seller/login')
// })
app.get('/seller/login', (req, res) => {
    res.render('seller/login')
})

app.get('/seller/register', (req, res) => {
    res.render('seller/register')
})

app.get('/seller/sellerView', (req, res) => {
    res.render('seller/sellerView', sellerTransactions)
})

app.post('/seller/sellerView', (req, res) => {
    res.render('seller/sellerView', sellerTransactions)
})

app.get('/seller/services', (req, res) => {
    res.render('seller/services')
})

app.get('/seller/reviews', (req, res) => {
    res.render('seller/reviews')
})

app.get('/seller/profile', (req, res) => {
    res.render('seller/profile')
})

app.get('/seller/transactions', (req, res) => {
    res.render('seller/transaction', sellerTransactions)
})

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
