var path = require('path');

module.exports = {
  entry: [ './src/root.js' ],
  resolve: {
    root: [ path.resolve(__dirname, './src')],
    extensions: [ '', '.js', '.json', '.jsx' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'spa.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel', exclude: /(node_modules)/
      }
    ]
  }
};
