var express =require("express");
var router = express.Router();
var BoardItem = require("../models/item");


router.get("/", function(req, res){
    BoardItem.find({}, function(err, items){
      if (err){
        console.log(err);
      } else {
        res.render("items/items", {items: items});
      }
    })
});

router.post("/", isLoggedIn, function(req, res){
    console.log(req.user);
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username}
    var newItem = {name: name, image:image, description: description, author: author};
    console.log(newItem);
    BoardItem.create(newItem, function(err, item){
      if(err){
        console.log(err);
      } else {
        console.log(newItem);
        res.redirect("items");
      }
    })

});

router.get("/new", isLoggedIn, function(req, res){
    res.render("items/new");
});

router.get("/:id", function(req, res){
    BoardItem.findById(req.params.id).populate("comments").exec(function(err, item){
      if(err){
        console.log(err);
      } else {
        console.log(item);
        res.render("items/show", {item: item})
      }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
