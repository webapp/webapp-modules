var Compiler = require("es6-module-transpiler").Compiler;

module.exports = function(format, moduleName, source, callback) {
  callback(new Compiler(String(source), moduleName.slice(-2, 0)).toAMD());
};
