module.exports = {
	structure: 'npx @11ty/eleventy [options]',
	defaults: {
		preserved_paths: 'node_modules/'
	},
	options: {
		config: {
			name: 'Config',
			description: 'Override the Eleventy config file path (default: .eleventy.js).',
			option: '--config',
			type: 'string'
		},
		formats: {
			name: 'Formats',
			description: 'Whitelist only certain template types (default: *).',
			option: '--formats',
			type: 'string'
		},
		input: {
			name: 'Input',
			description: 'Input template files (default: .).',
			option: '--input',
			type: 'string'
		},
		output: {
			name: 'Output',
			description: 'Site output location (default: _site).',
			option: '--output',
			type: 'string',
			default: '_site'
		},
		pathprefix: {
			name: 'Path Prefix',
			description: 'Change all URL template filters to use this subdirectory.',
			option: '--pathprefix',
			type: 'string'
		},
		quiet: {
			name: 'Quiet',
			description: 'Don’t print all written files (off by default).',
			option: '--quiet',
			type: 'boolean',
			default: false
		}
	}
};
