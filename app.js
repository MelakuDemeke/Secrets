const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = new express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render('home');
});


app.listen("3000",()=> {
    console.log("server started at http://localhost:3000");
});
