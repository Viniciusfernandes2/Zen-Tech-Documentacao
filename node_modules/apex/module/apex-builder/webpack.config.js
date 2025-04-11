var path = require('path');

module.exports = {
	devtool: '#source-map',
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	externals: {
		'inferno': 'Inferno',
		'redux': 'Redux'
	}
};
