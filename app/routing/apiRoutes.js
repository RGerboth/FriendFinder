//api routes
var friends = require("../data/friends.js")

module.exports = function(app) {
  app.post("/api/findFriend", function(req, res) {
      var newFriend = req.body;
      newFriend.scores = newFriend["scores[]"]
      newFriend["scores[]"] = []

      if (newFriend) {

        var lowFriendScore = 40
        var newFriendScore = 0
        var newBestieIndex = 0
        //loop through friends[] and add up difference
        //lowest difference is the match     
        // 
        for (i=0; i<friends.length; i++){
          for (j=0; j<10; j++) {
            newFriendScore += Math.abs(friends[i].scores[j] - newFriend.scores[j])
          }
            console.log("New Friend Score: " + newFriendScore)
            console.log("Low Friend Score: " + lowFriendScore)
          if (newFriendScore <= lowFriendScore) {
            lowFriendScore = newFriendScore
            newFriendScore = 0
            newBestieIndex = i
            console.log("New Bestie Index: " + newBestieIndex)
          } 

          newFriendScore = 0

        }
        //add the new friend to the list and return the best match to display
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
        friends.push(newFriend)

        return res.json(friends[newBestieIndex])

      }

      return res.json(friends);

  });

  app.get("/api", function(req, res) {
      return res.json(friends);
  });

  // Create New Characters - takes in JSON input
  app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcharacter = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    friends.push(newcharacter);

    res.json(newcharacter);
  });

  
}

