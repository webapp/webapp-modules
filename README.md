WebApp Modules
==============

> convert modules, authored in arbitrary formats, to amd

How you decide to structure you web application is always up for debate.  This
tool integrates with your Connect server as middleware and can be used
standalone in any build step.

There is also a Grunt task: grunt-webapp-modules that wraps this module to
produce transpiled builds to CJS and AMD formats, this suits the majority of
further use cases.

It uses automatic source file module detection and assumes lack of detection
means pass-through.

## Registering a custom transpiler ##


## Converting source into AMD ##

``` javascript
// @outputFormat - "amd", "cjs"
modules.convert(source, outputFormat);
