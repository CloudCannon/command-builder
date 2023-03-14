const reader = require('./reader-options');

module.exports = {
	...reader,
	defaults: {
		environment_variables: [
			{
				key: 'DENO_DIR',
				value: '.deno_cache'
			}
		],
		preserved_paths: '.deno_cache/'
	},
	options: {
		...reader.options,
		build_command: {
			...reader.options.build_command,
			default: 'deno task build'
		},
		output_path: {
			...reader.options.output_path,
			default: '_site'
		}
	}
};
