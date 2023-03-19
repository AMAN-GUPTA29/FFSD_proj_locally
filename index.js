const sqlite3 = require("sqlite3")
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const sendIndex = require('./jsData/indexCardDetails')

const databasePath = path.join(__dirname, 'data', 'database.db')
const db = new sqlite3.Database(databasePath, (err) => {
    if(err) {
        console.log("Error : " + err.message)
        return;
    }
    console.log("Database Connected !!!")
})

const app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))


app.listen(8000)

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
