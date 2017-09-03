let resolve = require("rollup-plugin-node-resolve");
let commonjs = require("rollup-plugin-commonjs");
let uglify = require("rollup-plugin-uglify");
let babel = require("rollup-plugin-babel");

var config = {
  input: "src/index.js",
  output: {
    format: "umd",
    file: "dist/jquery-textWrapper.js"
  },
  name: "jQueryTextWrapper",
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: '**',
    }),
    babel({
      exclude: "node_modules/**",
    })
  ]
};

if(process.env.NODE_ENV === "production") {
  config.output.file = "dist/jquery-textWrapper.min.js";
  config.plugins.push(
    uglify()
  )
}

module.exports = config;