const express = require("express")
const app = express()

app.get('/', function(req, res){
    res.send('<h1><em>Hello</em> World</h1>')
})

app.get('/hobbies', function(req, res){
    res.send('<h1>No hobbies</h1>')
})
app.get('/contact', function(req, res){
    res.send('<h1>Please don\'t contact me at any point. I am busy</h1>')
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})