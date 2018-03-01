// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Seed data for friends list
var friends = [
  {
    routeName: "daenerystargaryen",
    name: "Daenerys Targaryen",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/5/5f/Daenerys_Dragonpit.jpg/revision/latest?cb=20171015095128",
    scores: ["5", "2", "3", "4", "4", "4", "2", "3", "3", "2"]
  },
  {
    routeName: "jonsnow",
    name: "John Snow",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/a/a5/Profile-JonSnow-707.png/revision/latest?cb=20170828030553",
    scores: ["2", "4", "4", "5", "4", "3", "5", "4", "3", "2"]
  },
  {
    routeName: "cerseilannister",
    name: "Cersei Lannister",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/8/87/Cersei_Lannister_%28S05E01%29.jpg/revision/latest?cb=20150420193418",
    scores: ["4", "2", "4", "5", "1", "5", "4", "1", "2", "3"]
  },
  {
    routeName: "aryastark",
    name: "Arya Stark",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/5/54/Arya_the_dragon_and_the_wolf_s7.jpg/revision/latest/scale-to-width-down/319?cb=20170828062911",
    scores: ["5", "4", "5", "2", "3", "2", "4", "3", "4", "2"]
  },
  {
    routeName: "margaerytyrell",
    name: "Margaery Tyrell",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/b/b5/Margaery_Tyrell_S6.png/revision/latest?cb=20160729224605",
    scores: ["5", "4", "4", "3", "4", "2", "1", "4", "5", "5"]
  },
  {
    routeName: "robert",
    name: "Robert",
    image: "https://vignette.wikia.nocookie.net/gameofthrones/images/b/bc/Sandor_Clegane_Season_7_Promo_Image.PNG/revision/latest/scale-to-width-down/343?cb=20170828063713",
    scores: ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3"]
  },
  {
    routeName: "tyrionlannister",
    name: "Tyrion Lannister",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Tyrion_Lannister-Peter_Dinklage.jpg/220px-Tyrion_Lannister-Peter_Dinklage.jpg",
    scores: ["5", "2", "2", "1", "4", "3", "5", "3", "2", "1"]
  }
];

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"))
})

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

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
