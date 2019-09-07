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

router.get("/:id/edit", checkOwnership, function(req, res){
    BoardItem.findById(req.params.id, function(err, item){
          res.render("items/edit", {item: item});
      });
});

router.put("/:id", function(req, res){
  BoardItem.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem){
    if (err){
      res.redirect("/items");
    } else {
      res.redirect("/items/" + req.params.id);
    }
  });
});

router.delete("/:id", function(req, res){
  BoardItem.findByIdAndRemove(req.params.id, function(err){
    if (err){
      res.redirect("/items");
    } else {
      res.redirect("/items");
    }
  });
});


function checkOwnership(req, res, next){
  if (req.isAuthenticated()){
    BoardItem.findById(req.params.id, function(err, item){
      if (err){
        res.redirect("back");
      } else {
        if (item.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }

}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
