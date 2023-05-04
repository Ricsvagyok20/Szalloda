const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kotprog"
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("DB connection OK");
});

module.exports = db;