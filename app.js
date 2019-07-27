var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = [
  {name: "Item1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12},
  {name: "Item2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12},
  {name: "Item3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12}
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
