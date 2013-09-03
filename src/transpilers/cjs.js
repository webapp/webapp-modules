module.exports = function(format, moduleName, source) {
  // Resolve AMD to CommonJS.
  var wrapped = [
    "define(function(require, exports, module) {",
      source,
    "});"
  ].join("\n");

  return {
    amd: wrapped,
    cjs: source,
  };
};
