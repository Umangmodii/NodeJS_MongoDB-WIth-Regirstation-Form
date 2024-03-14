const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { error } = require('console');

const port = 3000;
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// MongoDB connection URI
mongoose.connect('mongodb://localhost:27017/Regirstration')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

// Define a mongoose schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     phone: String,
//     gender: String,
//     password: String
// });

app.post('/sign_up', (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password
    }

    db.collection('Login').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_success.html')
})



// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
