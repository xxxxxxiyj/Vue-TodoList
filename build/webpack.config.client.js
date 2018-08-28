const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')  // 合并不同webpack配置
const ExtractPlugin = require('extract-text-webpack-plugin')   //单独打包css  webpack4不能用了 可npm install --save-dev extract-text-webpack-plugin@next
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugin = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env':{
        NODE_ENV:isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
	port: 8080,
	host: '127.0.0.1',   //0.0.0.0  http://localhost:8080/
	overlay: {
		error: true,
	},
	hot: true
}

let config

if (isDev) {     //开发环境（run dev)
	config = merge(baseConfig, {
		devtool: '#cheap-module-eval-source-map', // 调试器
		module: {
			rules: [
				{
					test: /\.styl/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							}
						},
						'stylus-loader'
					]
				}
			]
		},
		devServer,
		plugins: defaultPlugin.concat([ //对应devServer中的hot,局部更新组建，不刷新网页
			new webpack.HotModuleReplacementPlugin(),
			// new webpack.NoEmitOnErrorsPlugin()
		])
	})
} else {    //正式环境(run build)
	config = merge(baseConfig, {
		entry: {  // 分离JS文件
			app: path.join(__dirname, '../src/index.js'),
			// vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:8].js'
		},
		modules: {
			rules: [
				{
					test: /\.styl/,
					use: ExtractPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader',
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true,
								}
							},
							'stylus-loader'
						]
					})
				}
			]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
		plugins: defaultPlugin.concat([
			new ExtractPlugin('styles.[chunkhash:8].css'),    //contentHsah会报错
		])
	})
}


module.exports = config;