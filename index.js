var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

const app = express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

var db= mongoose.connection;

 


app.post("/sign_up", (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }

    db.collection('users').insertOne(data, (err, collection) =>{
        if(err) throw err;
        console.log('Record inserted Successfully ONYX');
    });

    return res.redirect("signup_success.html");
})

app.get("/", (req,res)=>{


    res.set({
        "Allow-access-Allow-Origin": "*"
    })

    return res.redirect('index.html');
}).listen(3000);