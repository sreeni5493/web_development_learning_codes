const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const e = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems = [];

app.get("/", function (req, res) {
  let day = date.getDay();
  res.render("list", { listTitle: day, newListItems: items});
});

app.get("/work", function (req, res) {
    // let item = req.body.newItem;
    // workitems.push(item);
    // res.redirect()
    res.render("list", { listTitle: "WORK LIST", newListItems: workitems})
})
app.get("/about", function(req,res){
    res.render("about")
})
app.post("/", function(req, res){
    console.log(req.body);
    if (req.body.list === "WORK LIST"){
        workitems.push(req.body.newItem)
        res.redirect('work')
    }
    else {
        items.push(req.body.newItem)
        res.redirect("/")
    }
    // res.on("data", function(data){
        
    // })
   
})

app.post("/work", function(req, res){
    
    res.redirect("/work");
})

app.post("/switch", function(req,res){
    console.log(req.body)
    if (req.body.home === "WORK LIST"){
        res.redirect('/')
    }
})
app.listen(4000, function () {
  console.log("Server is up and running");
});
