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

router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newItem = {name: name, image:image, description: description};
    BoardItem.create(newItem, function(err, item){
      if(err){
        console.log(err);
      } else {
        res.redirect("items/items");
      }
    })

});

router.get("/new", function(req, res){
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

module.exports = router;
