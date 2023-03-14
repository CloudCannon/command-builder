const readerNpm = require('./reader-npm-options');

module.exports = {
	...readerNpm,
	options: {
		...readerNpm.options,
		output_path: {
			...readerNpm.options.output_path,
			default: 'build'
		}
	}
};
