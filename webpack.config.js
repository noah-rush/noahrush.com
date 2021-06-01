module.exports = {
	entry: __dirname+'/src/App.jsx',
	mode: 'development',
	output: {
		path: __dirname+'/public/js',
		filename: 'bundle.js'
	},
	watch: false,
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env'],
							['@babel/preset-react'],
						]
						,plugins: [
      [
        "@babel/plugin-proposal-class-properties"
      ]
  ],
					}
				}
			}
		]
	}
}