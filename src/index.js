var fs = require("fs");
var path = require("path");
var esprima = require("esprima");

// Connect middleware.
var middleware = function(req, res, next) {
  // Alias the options object.
  var options = this;
  var dir = path.dirname(req.url).slice(1);

  // Normal process if not a JavaScript file or in a folder we are processing.
  if (path.extname(req.url) !== ".js" || dir.indexOf(options.sourceFolder) !== 0) {
    return next();
  }

  // The module name is just the JavaScript file stripped of the
  // host and location.
  var moduleName = req.url.slice(1);

  // Only process JavaScript files, and trim off the QueryString.
  fs.readFile(req.url.slice(1).split("?")[0], function(err, contents) {
    // Send back JavaScript.
    res.setHeader("Content-Type", "application/javascript");

    var sourceFormat = options.sourceFormat || exports.detect(contents);

    // Return the transpiled output.
    res.end(exports.transpile(sourceFormat, moduleName, contents).amd);
  });
};

// Returns a middleware function and accepts options.
exports = module.exports = function(root, options) {
  options = options || {};

  // Set defaults.
  options.__proto__ = {
    sourceFormat: null,
    sourceFolder: root
  };

  // Assign them to the module for reuse in middleware.
  return middleware.bind(options);
};

// Map transpilers to their type.
var transpiler = exports.transpilers = {};

// Attempt to detect different module types if the end user wasn't explicit.
exports.detect = function(source) {
  source = String(source);

  // If the source fails, assume es6, who cares it's not valid anyways.
  try { esprima.parse(source); } catch (ex) { return "es6"; }

  // You shoudn't be using `define`, we can make this more robust later.
  if (source.indexOf("define(") > -1) {
    return "amd";
  }

  // Might as well be "cjs".
  return "cjs";
};

// Locate the correct transpiler and process the contents.
exports.transpile = function(format, moduleName, contents) {
  var sourceFormat = format || exports.detect(contents);
  var source = transpiler[sourceFormat].apply(null, arguments);

  // Remove erroneous pathing.
  source.amd = source.amd.replace(/\.\.\//g, "");

  return source;
};

// Attach the default transpilers.
transpiler["amd"] = require("./transpilers/amd");
transpiler["cjs"] = require("./transpilers/cjs");
transpiler["es6"] = require("./transpilers/es6");
