module.exports = function(format, moduleName, source, callback) {
  callback([
    "define(function(require, exports, module) {",
      source,
    "});"
  ].join("\n"));
};
