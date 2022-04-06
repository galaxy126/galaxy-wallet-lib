
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, './index.js'),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'cardano.min.js',
		publicPath: '/',
		library: 'Cardano'
	},
	experiments: {
		syncWebAssembly: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
