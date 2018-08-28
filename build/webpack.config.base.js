// 放置所有webpack配置文件需用到的共同配置
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry:path.join(__dirname,'../src/index.js'),
  output:{
      filename: 'bundle.[hash:8].js',
      path:path.join(__dirname,'dist')
  },
  module:{
      rules:[
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
          test: /\.jsx$/,
          loader:'babel-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use:[
              {
                  loader:'url-loader',
                  options:{
                      limit:1024,
                      name:'resources/[path][name].[hash:8].[ext]'
                  }
              }
          ]
        }
      
      ]
  }
}

module.exports=config;