module.exports = {
	structure: 'npm run build',
	options: {
		install_command: {
			name: 'Install Command',
			description: 'Command to install dependencies before build.',
			type: 'string',
			suggestion: 'npm install'
		},
		build_command: {
			name: 'Build Command',
			description: 'Command to build your site.',
			type: 'string',
			suggestion: 'npm run build'
		},
		output_path: {
			name: 'Output Path',
			description: 'Path to the output folder you are building into.',
			type: 'string',
			suggestion: 'public'
		}
	}
};
