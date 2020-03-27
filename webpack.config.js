const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'assets/js'),
    filename: 'main.js',
  },
  module: {
     rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
           loader: "babel-loader",
           options: {
            presets: ["@babel/preset-env"],
          }
        }
       },
       {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
       },
       {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }
     ]
  },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   },
  //   extensions: ['*', '.js', '.vue', '.json']
  // },
  plugins: [
    new VueLoaderPlugin()
  ],
  
}