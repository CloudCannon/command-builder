module.exports = {
	structure: '',
	defaults: {
		preserved_paths: 'node_modules/'
	},
	options: {
		install_command: {
			name: 'Install Command',
			description: 'Command to install dependencies before build.',
			type: 'string'
		},
		build_command: {
			name: 'Build Command',
			description: 'Command to build your site.',
			type: 'string'
		},
		output_path: {
			name: 'Output Path',
			description: 'Path to the output folder you are building into.',
			type: 'string',
			suggestion: 'public'
		}
	}
};
