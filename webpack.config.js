const path = require('path');
const CssMinimizerWebpackPligin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin')


module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'scripts.js'
	},
	module: {
		rules: [
		  {
			test: /\.(scss|css)$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
		  },
		  {
			test: /\.(svg|png|gif|jpg)$/,
			exclude: /fonts/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		  },
		  {
			test: /\.(ttf|eot|woff|svg|woff2)$/,
			use: {
			  loader: "file-loader",
			  options: {
				name: '[name].[ext]',
				outputPath: 'fonts/'
			  }
			}
		  },
		  	{
			test: /\.pug$/,
			loader: 'pug-loader',
			options: {
				pretty: true
				}
			}
		]
	  },
	plugins: [
		new HtmlWebpackPlugin({
            template: "pages/page.pug"
        }),
		new CssMinimizerWebpackPligin(),
		new MiniCssExtractPlugin(),

	],
	optimization: {
		minimize: true,
	  },

}