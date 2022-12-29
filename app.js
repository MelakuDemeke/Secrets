const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = new express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/secretsDB')

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = "MelakuDemeke32587.";

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model('User',userSchema);

app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/login",(req,res)=>{
    res.render('login');
});

app.get("/register",(req,res)=>{
    res.render('register');
});

app.post("/register", (req,res)=>{
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });
    
    newUser.save(function (err) { 
        if (err){
            console.log(err);
        }else{
            res.render("secrets")
        }
     });
});

app.post("/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else {
            if (foundUser){
                if ( foundUser.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});

app.listen("3000",()=> {
    console.log("server started at http://localhost:3000");
});
