var express =require("express");
var router = express.Router({mergeParams: true});
var BoardItem = require("../models/item");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res){
  BoardItem.findById(req.params.id, function(err, item){
    if (err){
      console.log(err);
    } else {
      res.render("comments/new", {item: item});
    }
  });
});

router.post("", isLoggedIn,  function(req, res){
  BoardItem.findById(req.params.id, function(err, item){
    if (err){
      console.log(err);
      res.redirec("items");
    } else {
      console.log(req.body.comment);
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          comment.author.username = req.user.username;
          comment.author,id = req.user._id;
          comment.save();
          item.comments.push(comment);
          item.save();
          res.redirect("/items/" + item._id);
        }
      })
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
