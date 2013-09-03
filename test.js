var connect = require("connect");
var http = require("http");
var path = require("path");
var transform = require("./");

var app = connect()
  
  // Test out the modules.
  .use("/src", transform("cjs"))
  .use("/es6", transform("es6"))

  .use(function(req, res) {
    // Only work with JavaScript files.
    if (path.extname(req.url) === ".js") {
      
    }
    res.end("<pre>" + ""  + "</pre>");
  });

http.createServer(app).listen(8000);
