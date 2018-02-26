// Require dependencies
var http = require("http");
var fs = require("fs");

// Set our port to 8080
var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

  // Capture the url the request is made to
  var path = req.url;

  // When we visit different urls, read and respond with different files
  switch (path) {

    case "/survey":
      return fs.readFile(__dirname + "./public/survey.html", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });

    case "/github":
      return fs.readFile("https://github.com/rgerboth/friendfinder", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });

    // default to rendering home.html, if none of above cases are hit
    default:
      return fs.readFile(__dirname + "./public/home.html", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
  }
}

// Starts our server.
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
