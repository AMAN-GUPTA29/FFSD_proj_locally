const sqlite3 = require("sqlite3")
const express = require('express')
const path = require('path')

const databasePath = path.join(__dirname, 'data', 'database.db')
const db = new sqlite3.Database(databasePath, (err) => {
    if(err) {
        console.log("Error : " + err.message)
        return;
    }
    console.log("Database Connected !!!")
})


