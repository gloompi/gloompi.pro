const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const outputPath = path.resolve(__dirname, '../public')

const webpackConfig = {
	entry: {
		app: [
			'react-hot-loader/patch',
			path.resolve(__dirname, './src/index.js')
		]
	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, './src/assets/'),
				use: 'url-loader?limit=10000&name=assets/img/[name]-[hash].[ext]'
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&name=assets/fonts/[name]-[hash].[ext]"
      },
      {
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?limit=10000&name=assets/fonts/[name]-[hash].[ext]'
      },
			{
				test: /\.(webm|mp4)$/,
				loader: 'file-loader?limit=10000&name=assets/video/[name]-[hash].[ext]'
			},
			{ 
				test: require.resolve('tinymce/tinymce'), 
				loaders: [ 'imports-loader?this=>window', 'exports-loader?window.tinymce' ] 
			},
			{ 
				test: /tinymce\/(themes|plugins)\//, 
				loaders: [ 'imports-loader?this=>window' ] 
			} 
		]
	},
	resolve: {
		alias: {
			'components': path.resolve(__dirname, './src/components'),
			'containers': path.resolve(__dirname, './src/containers'),
			'constants': path.resolve(__dirname, './src/constants'),
			'decorators': path.resolve(__dirname, './src/decorators'),
			'selectors': path.resolve(__dirname, './src/selectors'),
			'actions': path.resolve(__dirname, './src/actions'),
			'reducers': path.resolve(__dirname, './src/reducers'),
			'store': path.resolve(__dirname, './src/store'),
			'assets': path.resolve(__dirname, './src/assets'),
			'utils': path.resolve(__dirname, './src/utils'),
			'svg': path.resolve(__dirname, './src/svg'),
		}
	},
	plugins: [
		new CopyWebpackPlugin([
			{ 
				context: './src/assets/images/works/',
				from: '**/*', 
				to: outputPath + '/assets/img/works/'
			},
			{ 
				from: './src/assets/images/loader.gif', 
				to: outputPath + '/assets/img/loader.gif'
			},
			{ 
				from: './src/assets/images/avatar.jpg', 
				to: outputPath + '/assets/img/avatar.jpg'
			},
			{ 
				from: './src/assets/images/favicon.ico', 
				to: outputPath + '/assets/img/favicon.ico'
			},
			{ 
				from: './src/assets/tinymce/', 
				to: outputPath + '/assets/tinymce/'
			}
		]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/assets/index.html'),
			filename: 'index.html',
			path: outputPath
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new UglifyJsPlugin({
			uglifyOptions: {
				comments: false, // remove comments
				compress: {
					unused: true,
					dead_code: true, // big one--strip code that will never execute
					warnings: false, // good for prod apps so users can't peek behind curtain
					drop_debugger: true,
					conditionals: true,
					evaluate: true,
					drop_console: true, // strips console statements
					sequences: true,
					booleans: true,
				}
			}
		}),
		new webpack.DefinePlugin({
				'process.env': {
						'NODE_ENV': JSON.stringify('production')
				}
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		port: 7777,
		proxy: [
			{
				path: '/api/',
				target: 'http://127.0.0.1:3000'
			},
			{
				path: '/uploads/',
				target: 'http://127.0.0.1:3000'
			}
		],
		historyApiFallback: true,
		inline: true,
		hot: true,
		host: 'localhost'
	}
}

module.exports = webpackConfig