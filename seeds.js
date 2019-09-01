var mongoose = require("mongoose"),
    BoardItem = require("./models/item"),
    Comment = require("./models/comment");

var data = [
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  {name: "Item2", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  {name: "Item3", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
];

module.exports = function seedDB(){
  BoardItem.remove({}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("items successfully removed");
    }
  });
  data.forEach(function(seed){
    BoardItem.create(seed, function(err, data){
      if (err){
        console.log(err);
      } else {
        console.log("added a new item");
        Comment.create({text: "Great item", author: "Tim"}, function(err, comment){
          if (err){
            console.log(err);
          } else {
            data.comments.push(comment);
            data.save();
            console.log("added a comment");
          }
        });
      }
    });
  });
};
