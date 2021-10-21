//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const articleScehema = {
    title: String,
    content: String
};

const Article = mongoose.model("Articles", articleScehema);

// using single route method for get, post and delete: Chained operations using route
app.route('/articles').get(function(req, res){
    Article.find(function(err, foundArticles){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.send(foundArticles);
            console.log(foundArticles)
    } 
    })
}).post(function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save();
}).delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles")
        }
        else{
            res.send(err)
        }
    })
});

// Specific article operations

app.route("/articles/:articleTitle").get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
}).put(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected article.");
      }
    }
  );
}).patch(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
}).delete(function(req, res){

  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding article.");
      } else {
        res.send(err);
      }
    }
  );
});

// app.get('/articles', )

// app.post('/articles', )

// app.delete('/articles', )
app.listen(3000, function() {
  console.log("Server started on port 3000");
});