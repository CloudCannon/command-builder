const reader = require('./reader-options');

module.exports = {
	...reader,
	structure: 'npm run build',
	defaults: {
		...reader.defaults,
		preserved_paths: 'node_modules/'
	},
	options: {
		...reader.options,
		install_command: {
			...reader.options.install_command,
			suggestion: 'npm install'
		},
		build_command: {
			...reader.options.build_command,
			suggestion: 'npm run build'
		},
		output_path: {
			...reader.options.output_path,
			suggestion: 'public'
		}
	}
};
