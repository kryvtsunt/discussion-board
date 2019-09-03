var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDb = require("./seeds"),
    BoardItem = require("./models/item"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    session = require("express-session");


mongoose.connect("mongodb://localhost/husky_board");
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


seedDb();

// PASSPORT
app.use(session({
  secret: 'kasaloma',
  resave: false,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


// BoardItem.create(
//   {
//     name: "First Item",
//     image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420",
//     description: "simple"
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
        res.render("items/items", {items: items});
      }
    })
});

app.post("/items", function(req, res){
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

app.get("/items/new", function(req, res){
    res.render("items/new");
});

app.get("/items/:id", function(req, res){
    BoardItem.findById(req.params.id).populate("comments").exec(function(err, item){
      if(err){
        console.log(err);
      } else {
        console.log(item);
        res.render("items/show", {item: item})
      }
  });
});

app.get("/items/:id/comments/new", isLoggedIn, function(req, res){
  BoardItem.findById(req.params.id, function(err, item){
    if (err){
      console.log(err);
    } else {
      res.render("comments/new", {item: item});
    }
  });
});

app.post("/items/:id/comments", isLoggedIn,  function(req, res){
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
          item.comments.push(comment);
          item.save();
          res.redirect("/items/" + item._id);
        }
      })
    }
  });
});

// AUTH

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/items");
      });
    }
  });
});

app.get("/login", function(req, res){
  res.render("login");
})

app.post("/login", passport.authenticate("local",
{
  successRedirect: "/items",
  failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("campgrounds");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect("/login");
  }
}



app.listen(3000, function(){
    console.log("Server has started");
});
