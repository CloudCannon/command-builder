const reader = require('./reader-options');

module.exports = {
	structure: '',
	options: {
		install_command: reader.options.install_command,
		build_command: {
			...reader.options.build_command,
			default: 'mkdocs build'
		},
		output_path: {
			...reader.options.output_path,
			default: 'site'
		}
	}
};
