var Compiler = require("es6-module-transpiler").Compiler;

module.exports = function(format, moduleName, source) {
  // Optional dependencies in CommonJS.
  var shim = [
    "var nodeRequire = require;",
    "var require = function(module) {",
      "try {",
        "return nodeRequire(module);",
      "} catch (ex) { ",
        "return null;",
      "}",
    "};"
  ].join("\n");

  return {
    amd: new Compiler(String(source), moduleName.slice(-2, 0)).toAMD(),
    cjs: shim + new Compiler(String(source), moduleName.slice(-2, 0)).toCJS(),
  };
};
