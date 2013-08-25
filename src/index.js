var fs = require("fs");
var path = require("path");

// Connect middleware.
var middleware = function(req, res, next) {
  // Alias the options object.
  var options = this;

  // Normal process if not a JavaScript file or in a folder we are processing.
  if (path.extname(req.url) !== ".js") {
    return next();
  }

  // The module name is just the JavaScript file stripped of the
  // host and location.
  var moduleName = req.url.slice(1);

  // Only process JavaScript files, and trim off the QueryString.
  // FIXME Figure out parent folder without using private property.
  fs.readFile(req._parsedUrl.href.slice(1).split("?")[0], function(err, contents) {
    // Return the transpiled output.
    exports.transpile(options.format, moduleName, contents, res.end.bind(res));
  });
};

// Returns a middleware function and accepts options.
exports = module.exports = function(format) {
  // Assign them to the module for reuse in middleware.
  return middleware.bind({ format: format || "amd" });
};

// Map transpilers to their type.
exports.transpilers = {};

// Store externally defined transpiler operations.
exports.attachTranspiler = function(format, transpiler) {
  exports.transpilers[format] = transpiler;
};

// Locate the correct transpiler and process the contents.
exports.transpile = function(format) {
  exports.transpilers[format].apply(null, arguments);
};

// Attach the default transpilers.
exports.attachTranspiler("amd", require("./transpilers/amd"));
exports.attachTranspiler("cjs", require("./transpilers/cjs"));
exports.attachTranspiler("es6", require("./transpilers/es6"));
