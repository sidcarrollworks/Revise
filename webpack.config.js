const path = require('path');

module.exports = {

  mode: "none",

  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/index.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'bundle.js',
  },

  module: {
  
    // npm install --save-dev babel-plugin-transform-es2015-destructuring
    // npm install --save-dev babel-plugin-transform-object-rest-spread
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: path.join(__dirname, '/client/src'),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '/client/src/styles'),
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:3000",
        "/auth": "http://localhost:3000"
    }
  }
};
