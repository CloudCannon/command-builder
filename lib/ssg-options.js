// TODO split this mega file into several smaller, less mega files

module.exports = {
	static: {
		structure: 'cp <source> destination',
		source: 'source'
	},

	jekyll: {
		structure: 'jekyll build [options]',
		options: {
			drafts: {
				name: 'Drafts',
				description: '',
				option: '--drafts',
				alias: '-D',
				type: 'boolean',
				default: false
			},
			unpublished: {
				name: 'Unpublished',
				description: '',
				option: '--unpublished',
				type: 'boolean',
				default: false
			},
			source: {
				name: 'Source',
				description: '',
				option: '--source',
				alias: '-s',
				type: 'string',
				validator: /.*/ig,
				default: '/'
			},
			limit_posts: {
				name: 'Limit Posts',
				description: '',
				option: '--limit_posts',
				type: 'number'
			},
			config: {
				name: 'Configuration',
				description: '',
				option: '--config',
				type: 'string',
				validator: /.*/ig
			},
			future: {
				name: 'Future',
				description: '',
				option: '--future',
				type: 'boolean',
				default: false
			},
			lsi: {
				name: 'LSI',
				description: '',
				option: '--lsi',
				type: 'boolean',
				default: false
			},
			trace: {
				name: 'Show Stack Traces',
				description: '',
				option: '--trace',
				type: 'boolean',
				default: false
			},
			verbose: {
				name: 'Verbose Output',
				description: '',
				option: '--verbose',
				type: 'boolean',
				default: false
			},
			quiet: {
				name: 'Silence Output',
				description: '',
				option: '--quiet',
				type: 'boolean',
				default: false
			},
			profile: {
				name: 'Liquid Profiler',
				description: '',
				option: '--profile',
				type: 'boolean',
				default: false
			}
		}
	},

	hugo: {
		structure: 'hugo [options]',
		options: {
			environment: {
				name: 'Environment',
				description: '',
				option: '--environment',
				alias: '-e',
				type: 'string',
				validator: /.*/ig
			},
			source: {
				name: 'Source',
				description: '',
				option: '--source',
				alias: '-s',
				type: 'string',
				validator: /.*/ig
			},
			baseURL: {
				name: 'Base URL',
				description: '',
				option: '--baseURL',
				alias: '-b',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'https://example.com'
			},
			config: {
				name: 'Config',
				description: '',
				option: '--config',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'path/config.yaml|json|toml'
			},
			configDir: {
				name: 'Config Directory',
				description: '',
				option: '--configDir',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'config'
			},
			contentDir: {
				name: 'Content Directory',
				description: '',
				option: '--contentDir',
				alias: '-c',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'content'
			},
			layoutDir: {
				name: 'Layout Directory',
				description: '',
				option: '--layoutDir',
				alias: '-l',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'layouts'
			},
			themesDir: {
				name: 'Themes Directory',
				description: '',
				option: '--themesDir',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'themes'
			},
			theme: {
				name: 'Theme',
				description: '',
				option: '--theme',
				alias: '-t',
				type: 'string',
				validator: /.*/ig
			},
			logFile: {
				name: 'Log file',
				description: '',
				option: '--logFile',
				type: 'string',
				validator: /.*/ig
			},
			ignoreVendorPaths: {
				name: 'Ignore Vendor Paths',
				description: '',
				option: '--ignoreVendorPaths',
				type: 'string',
				validator: /.*/ig
			},
			disableKinds: {
				name: 'Disable Kinds',
				description: '',
				option: '--disableKinds',
				type: 'string',
				validator: /.*/ig
			},
			buildDrafts: {
				name: 'Build Drafts',
				description: '',
				option: '--buildDrafts',
				alias: '-D',
				type: 'boolean',
				default: false
			},
			buildExpired: {
				name: 'Build Expired',
				description: '',
				option: '--buildExpired',
				alias: '-E',
				type: 'boolean',
				default: false
			},
			buildFuture: {
				name: 'Build Future',
				description: '',
				option: '--buildFuture',
				alias: '-F',
				type: 'boolean',
				default: false
			},
			cleanDestinationDir: {
				name: 'Clean Destination Directory',
				description: '',
				option: '--cleanDestinationDir',
				type: 'boolean',
				default: false
			},
			debug: {
				name: 'Debug',
				description: '',
				option: '--debug',
				type: 'boolean',
				default: false
			},
			enableGitInfo: {
				name: 'Enable Git Info',
				description: '',
				option: '--enableGitInfo',
				type: 'boolean',
				default: false
			},
			gc: {
				name: 'GC',
				description: '',
				option: '--gc',
				type: 'boolean',
				default: false
			},
			i18nWarnings: {
				name: 'I18n Warnings',
				description: '',
				option: '--i18n-warnings',
				type: 'boolean',
				default: false
			},
			ignoreCache: {
				name: 'Ignore Cache',
				description: '',
				option: '--ignoreCache',
				type: 'boolean',
				default: false
			},
			ignoreVendor: {
				name: 'Ignore Vendor',
				description: '',
				option: '--ignoreVendor',
				type: 'boolean',
				default: false
			},
			log: {
				name: 'Log',
				description: '',
				option: '--log',
				type: 'boolean',
				default: false
			},
			minify: {
				name: 'Minify',
				description: '',
				option: '--minify',
				type: 'boolean',
				default: false
			},
			noChmod: {
				name: 'No chmod',
				description: '',
				option: '--noChmod',
				type: 'boolean',
				default: false
			},
			noTimes: {
				name: 'No Times',
				description: '',
				option: '--noTimes',
				type: 'boolean',
				default: false
			},
			pathWarnings: {
				name: 'Path Warnings',
				description: '',
				option: '--path-warnings',
				type: 'boolean',
				default: false
			},
			mem: {
				name: 'Print Memory',
				description: '',
				option: '--print-mem',
				type: 'boolean',
				default: false
			},
			quiet: {
				name: 'Quiet',
				description: '',
				option: '--quiet',
				type: 'boolean',
				default: false
			},
			templateMetrics: {
				name: 'Template Metrics',
				description: '',
				option: '--templateMetrics',
				type: 'boolean',
				default: false
			},
			templateMetricsHints: {
				name: 'Template Metrics Hints',
				description: '',
				option: '--templateMetricsHints',
				type: 'boolean',
				default: false
			},
			verbose: {
				name: 'Verbose',
				description: '',
				option: '--verbose',
				alias: '-v',
				type: 'boolean',
				default: false
			},
			verboseLog: {
				name: 'Verbose Log',
				description: '',
				option: '--verboseLog',
				type: 'boolean',
				default: false
			}
		}
	}
};
