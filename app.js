var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = [
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10},
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10},
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10},
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10},
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10},
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", price: 10}
];


app.get("/", function(req, res){
  res.render("landing");
});

app.get("/items", function(req, res){

    res.render("items", {items: items});
});

app.post("/items", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newItem = {name: name, image:image};
    items.push(newItem);
    res.redirect("/items");

})

app.get("/items/new", function(req, res){
    res.render("new");
})



app.listen(3000, function(){
    console.log("Server has started");
});
