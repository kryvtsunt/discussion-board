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

var commentRoutes = require("./routes/comments");
var itemRoutes = require("./routes/items");
var indexRoutes = require("./routes/index");



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

app.use("/items", itemRoutes);
app.use("/items/:id/comments", commentRoutes);
app.use("/", indexRoutes);





app.listen(3000, function(){
    console.log("Server has started");
});
