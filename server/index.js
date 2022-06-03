const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"mysql@123",
    database:"loginsystem"
})

app.post('/register',(req,res)=>{

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password



    db.query("INSERT INTO users(username,email,password)VALUES (?,?,?)",[username,email,password],(err,result)=>{
        console.log(err);
    })
})

app.listen(3001,  () =>{
    console.log("Running on port 3001");
} )