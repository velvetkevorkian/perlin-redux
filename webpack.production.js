const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      p5: 'p5/lib/p5.min.js'
    }
  },
  plugins: [
    new MiniCSSExtractPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {}
          },
          'css-loader'
        ]
      }
    ]
  }
})
