const reader = require('./reader-options');

module.exports = {
	...reader,
	defaults: {
		environment_variables: [
			{
				key: 'BRIDGETOWN_ENV',
				value: 'production'
			}
		],
		preserved_paths: 'node_modules/,.bridgetown-cache/'
	},
	options: {
		...reader.options,
		install_command: {
			...reader.options.install_command,
			default: 'bundle install && yarn install'
		},
		build_command: {
			...reader.options.build_command,
			default: 'bin/bridgetown deploy'
		},
		output_path: {
			...reader.options.output_path,
			default: 'output'
		}
	}
};
