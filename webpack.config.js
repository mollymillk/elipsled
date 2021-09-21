const path = require('path');
const webpack = require('webpack')
const CssMinimizerWebpackPligin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var miniSVGDataURI = require('mini-svg-data-uri');

module.exports = {
	mode: 'development',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
	},
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
		  test: /\.(?:ico|png|jpg|jpeg|svg|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets/images",
          name: "[name].[ext]"
		}
      },
		  {
			test: /\.(ttf|eot|woff|woff2)$/,
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
        new CopyWebpackPlugin({
            patterns: [
                { from: "components/header/img", to: "img" },
				{from: "components/main_container/img", to: "img"},
				{from: "components/company_info/img", to: "img"}
              ],
        }),
        new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),

	],
	optimization: {
		minimize: true,
	  },

}