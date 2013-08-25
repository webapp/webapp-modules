module.exports = ->
  @initConfig
    
    jshint:
      files: "src/index.js"

  @loadNpmTasks "grunt-contrib-jshint"

  @registerTask "default", ["jshint"]
