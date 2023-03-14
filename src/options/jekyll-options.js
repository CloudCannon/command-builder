module.exports = {
	structure: 'jekyll build [options]',
	defaults: {
		environment_variables: [
			{
				key: 'JEKYLL_ENV',
				value: 'production'
			}
		],
		preserved_paths: '.jekyll-cache/,.jekyll-metadata/'
	},
	options: {
		source: {
			name: 'Source',
			description: 'Change the directory where Jekyll will read files.',
			option: '--source',
			alias: '-s',
			type: 'string',
			validator: /.*/ig,
			default: ''
		},
		config: {
			name: 'Configuration',
			description: 'Specify config files instead of using _config.yml automatically. Settings in later files override settings in earlier files.',
			option: '--config',
			type: 'string',
			validator: /.*/ig
		},
		limit_posts: {
			name: 'Limit Posts',
			description: 'Limit the number of posts to parse and publish.',
			option: '--limit_posts',
			type: 'number'
		},
		incremental: {
			name: 'Incremental Regeneration',
			description: 'Experimental Feature. Shorten build times by only generating documents and pages that were updated since the previous build.',
			option: '--incremental',
			alias: '-I',
			type: 'boolean',
			default: false
		},
		drafts: {
			name: 'Drafts',
			description: 'Render posts in the _drafts folder.',
			option: '--drafts',
			alias: '-D',
			type: 'boolean',
			default: false
		},
		unpublished: {
			name: 'Unpublished',
			description: 'Render posts that were marked as unpublished.',
			option: '--unpublished',
			type: 'boolean',
			default: false
		},
		future: {
			name: 'Future',
			description: 'Publish posts or collection documents with a future date.',
			option: '--future',
			type: 'boolean',
			default: false
		},
		lsi: {
			name: 'LSI',
			description: 'Produce an index for related posts.',
			option: '--lsi',
			type: 'boolean',
			default: false
		},
		trace: {
			name: 'Show Stack Traces',
			description: 'Generate a Liquid rendering profile to help you identify performance bottlenecks.',
			option: '--trace',
			type: 'boolean',
			default: false
		},
		verbose: {
			name: 'Verbose Output',
			description: 'Print verbose output.',
			option: '--verbose',
			type: 'boolean',
			default: false
		},
		quiet: {
			name: 'Silence Output',
			description: 'Silence the normal output from Jekyll during a build.',
			option: '--quiet',
			type: 'boolean',
			default: false
		},
		profile: {
			name: 'Liquid Profiler',
			description: 'Output more information after a build error.',
			option: '--profile',
			type: 'boolean',
			default: false
		}
	}
};
