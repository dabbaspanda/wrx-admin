module.exports = () => ({
	plugins: {
		autoprefixer: {
			browsers: [
				'last 20 versions',
				'iOS >= 8',
				'Android >= 4.2',
				'Samsung >= 4.2',
				'ExplorerMobile >= 9',
			],
		},
		cssnano: {
			normalizeUrl: false,
			safe: true,
		},
	},
});
