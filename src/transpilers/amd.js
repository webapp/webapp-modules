module.exports = function(format, moduleName, source) {
  // Resolve AMD to CommonJS.
  var shim = [
    "var define = function(callback) {",
      "callback.call(this, require, exports, module);",
    "};"
  ].join("\n");

  return {
    amd: String(source),
    cjs: shim + String(source),
  };
};
