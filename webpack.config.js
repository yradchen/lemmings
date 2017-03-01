module.exports = {
  entry: "./lib/main.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
};


// var path = require('path');
//
// module.exports = {
//   entry: './frontend/codeables.jsx',
//   output: {
//     path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.jsx?$/],
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015', 'react']
//         }
//       }
//     ]
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.js', '.jsx', '*']
//   }
// };
