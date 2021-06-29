const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
	entry: {
		adminDashboard: './src/assets/js/index-admin-dashboard.js',
	},
	output: {
		path: path.resolve(__dirname, './dist/js/'),
		filename: '[name].[contenthash].js',
	},
	cache: false,
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
				include: [
					path.resolve(__dirname, './src/assets'),
					path.resolve(__dirname, './dist'),
				],
			},
		],
	},
	plugins: [
		new AssetsPlugin({
			filename: 'webpack.assets.json',
			path: path.resolve(__dirname, './dist/'),
			prettyPrint: true,
		}),
	],
};
