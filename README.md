WebApp Modules
--------------

> library for transpiling various module formats; includes connect middleware

How you decide to structure you web application is always up for debate.  This
tool integrates with your Connect server as middleware and can be used
standalone in any build step.

There is a Grunt task: grunt-webapp-modules that wraps this module to produce
transpiled builds to CJS and AMD formats, this suits the majority of use cases.

It uses automatic source file module detection, but you should always specify
the source format to convert from for reliability.

#### Connect middleware ####

This will provide on-the-fly transpiling of your module to AMD.

``` javascript
var connect = require("connect");
var modules = require("webapp-modules");

var app = connect();

// Specify the path to your source code.
app.use(modules("src"));

// Specify a specific source format.
app.use("modules("src", "es6"));
```

#### Consumable API ####

If you would like to consume this project and use it's detection and transpile
features, you can easily require it in your Node application.

``` javascript
var modules = require("webapp-modules");

// Convert given source.
var source = modules.transpile("cjs", "hiModule", "var hi = require('hi');");

// Detect given source.
var sourceFormat = modules.detect("define(function() { });");

console.log(sourceFormat);
// => "amd"
```

#### Registering a custom transpiler ####

This will customize the transpiler logic to provide different functionality on
a given `sourceFormat`.

``` javascript
var modules = require("webapp-modules");

modules.transpilers["my-format"] = function(format, moduleName, source) {
  // Pass through.
  return {
    amd: source,
    cjs: source
  };
}
```

#### License ####

MIT.
