var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/husky_board");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA
var boardItemSchema = new mongoose.Schema({
  name: String,
  image: String
});

var BoardItem = mongoose.model("BoardItem", boardItemSchema);

// BoardItem.create(
//   {
//     name: "First Item",
//     image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420"
//   }, function(err, item){
//     if(err){
//       console.log(err)
//     } else {
//       console.log("Created Item");
//       console.log(item);
//     }
//   }
// );


app.get("/", function(req, res){
  res.render("landing");
});

app.get("/items", function(req, res){
    BoardItem.find({}, function(err, items){
      if (err){
        console.log(err);
      } else {
        res.render("items", {items: items});
      }
    })
});

app.post("/items", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newItem = {name: name, image:image};
    BoardItem.create(newItem, function(err, item){
      if(err){
        console.log(err);
      } else {
        res.redirect("/items");
      }
    })

})

app.get("/items/new", function(req, res){
    res.render("new");
})



app.listen(3000, function(){
    console.log("Server has started");
});
