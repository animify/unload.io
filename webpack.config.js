const path = require('path')
const webpack = require('webpack')
const nib = require('nib')
const jeet = require('jeet')
const rupture = require('rupture')

module.exports = {

	entry: [
		'webpack-dev-server/client?http://0.0.0.0:4000',
		'webpack/hot/only-dev-server',
		'./src/index.jsx',
	],

	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				BROWSER: JSON.stringify(true)
			}
		})
	],

	resolve: {
		extensions: ['', '.js', '.jsx'],
	},

	module: {
		loaders: [{
			test: /\.jsx$/,
			loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
			include: path.join(__dirname, 'src'),
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader',
		}, {
			test: /\.styl$/,
			loader: 'style-loader!css-loader!stylus-loader',
			exculde: /node_modules/
		}, {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff',
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream',
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file',
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml',
		}]
	},

	stylus: {
		use: [nib(), jeet(), rupture()]
	},

	devServer: {
		historyApiFallback: true,
		contentBase: 'public/',
		proxy: {
			'/api/*': {
				target: 'http://localhost:3000',
				secure: false,
			},
		},
	},
};
