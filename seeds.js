var mongoose = require("mongoose"),
    BoardItem = require("./models/item"),
    Comment = require("./models/comment");

var data = [
  {name: "Item1", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "basic description1"},
  {name: "Item2", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "basic description2"},
  {name: "Item3", image: "https://images.contentful.com/q602vtcuu3w3/6CGViz02AM2aOiyWYo4EQ4/6f74f2e5e34679a35ac329f5a194988d/Group_10.jpg?q=80&w=420", description: "basic description3"}
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
      }
    });
  });
};
