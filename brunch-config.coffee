exports.config =
# See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo: 'app.js'
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'app.js'
  plugins:
    react:
      transformOptions:
        harmony: no    # include some es6 transforms
        sourceMap: no   # generate inline source maps
        stripTypes: no  # strip type annotations
      babel: false
    imageoptimizer:
      smushit: false # if false it use jpegtran and optipng, if set to true it will use smushit
      path: 'images' # your image path within your public folder
    uglify:
      mangle: true
      compress:
        global_defs:
          DEBUG: false
  overrides:
    production:
      optimize: true
      sourceMaps: false
      plugins: autoReload: enabled: false
  server:
    run: yes