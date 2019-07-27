var express = require("express");
app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/items", function(req, res){
    var items = [
      {name: "Item1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12},
      {name: "Item2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12},
      {name: "Item3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SdgzrHXWk4Bnf-bFtxYprEpa37VgQnLWXD4XbQefZSy77a10", price: 12}
    ];
    res.render("items", {items: items});
});

app.listen(3000, function(){
    console.log("Server has started");
});
