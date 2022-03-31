const readerOptions = require('./reader-options');

module.exports = {
	structure: '',
	options: {
		install_command: readerOptions.options.install_command,
		build_command: {
			...readerOptions.options.build_command,
			default: 'mkdocs build'
		},
		output_path: {
			...readerOptions.options.output_path,
			default: 'site'
		}
	}
};
