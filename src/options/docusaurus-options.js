const readerNpm = require('./reader-npm-options');

module.exports = {
	...readerNpm,
	defaults: {
		...readerNpm.defaults,
		preserved_paths: 'node_modules/,.docusaurus/'
	},
	options: {
		...readerNpm.options,
		output_path: {
			...readerNpm.options.output_path,
			default: 'build'
		}
	}
};
