// TODO split this mega file into several smaller, less mega files

module.exports = {
	static: {
		structure: 'cp <source> destination',
		source: 'source',
		options: {
			source: {
				name: 'Source',
				description: 'The path CloudCannon reads your files.',
				type: 'string'
			}
		}
	},

	jekyll: {
		structure: 'jekyll build [options]',
		options: {
			source: {
				name: 'Source',
				description: 'Change the directory where Jekyll will read files.',
				option: '--source',
				alias: '-s',
				type: 'string',
				validator: /.*/ig,
				default: '/'
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
	},

	hugo: {
		structure: 'hugo [options]',
		options: {
			environment: {
				name: 'Environment',
				description: 'The environment used in the build.',
				option: '--environment',
				alias: '-e',
				type: 'string',
				validator: /.*/ig
			},
			source: {
				name: 'Source',
				description: 'Path to read files relative from.',
				option: '--source',
				alias: '-s',
				type: 'string',
				validator: /.*/ig
			},
			baseURL: {
				name: 'Base URL',
				description: 'Hostname and path to the root (e.g. https://example.com/).',
				option: '--baseURL',
				alias: '-b',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'https://example.com'
			},
			config: {
				name: 'Config',
				description: 'Path to the config file.',
				option: '--config',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'path/config.yaml|json|toml'
			},
			configDir: {
				name: 'Config Directory',
				description: 'Path to the config directory.',
				option: '--configDir',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'config'
			},
			contentDir: {
				name: 'Content Directory',
				description: 'Path to the content directory.',
				option: '--contentDir',
				alias: '-c',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'content'
			},
			layoutDir: {
				name: 'Layout Directory',
				description: 'Path to layout directory.',
				option: '--layoutDir',
				alias: '-l',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'layouts'
			},
			themesDir: {
				name: 'Themes Directory',
				description: 'Path to the themes directory.',
				option: '--themesDir',
				type: 'string',
				validator: /.*/ig,
				suggestion: 'themes'
			},
			theme: {
				name: 'Theme',
				description: 'Themes to use (located in themes directory).',
				option: '--theme',
				alias: '-t',
				type: 'string',
				validator: /.*/ig
			},
			logFile: {
				name: 'Log file',
				description: 'The log file path (if logging enabled).',
				option: '--logFile',
				type: 'string',
				validator: /.*/ig
			},
			ignoreVendorPaths: {
				name: 'Ignore Vendor Paths',
				description: 'Ignores any _vendor for module paths matching the given pattern.',
				option: '--ignoreVendorPaths',
				type: 'string',
				validator: /.*/ig
			},
			disableKinds: {
				name: 'Disable Kinds',
				description: 'Disable different kind of pages (home, RSS, etc).',
				option: '--disableKinds',
				type: 'string',
				validator: /.*/ig
			},
			buildDrafts: {
				name: 'Build Drafts',
				description: 'Include content marked as draft.',
				option: '--buildDrafts',
				alias: '-D',
				type: 'boolean',
				default: false
			},
			buildExpired: {
				name: 'Build Expired',
				description: 'Include expired content.',
				option: '--buildExpired',
				alias: '-E',
				type: 'boolean',
				default: false
			},
			buildFuture: {
				name: 'Build Future',
				description: 'Include content with publish date in the future.',
				option: '--buildFuture',
				alias: '-F',
				type: 'boolean',
				default: false
			},
			cleanDestinationDir: {
				name: 'Clean Destination Directory',
				description: 'Remove files from destination not found in static directories.',
				option: '--cleanDestinationDir',
				type: 'boolean',
				default: false
			},
			debug: {
				name: 'Debug',
				description: 'Output debug output.',
				option: '--debug',
				type: 'boolean',
				default: false
			},
			enableGitInfo: {
				name: 'Enable Git Info',
				description: 'Add Git revision, date and author info to the pages.',
				option: '--enableGitInfo',
				type: 'boolean',
				default: false
			},
			gc: {
				name: 'GC',
				description: 'Enable to run some cleanup tasks (remove unused cache files) after the build.',
				option: '--gc',
				type: 'boolean',
				default: false
			},
			i18nWarnings: {
				name: 'I18n Warnings',
				description: 'Print missing translations.',
				option: '--i18n-warnings',
				type: 'boolean',
				default: false
			},
			ignoreCache: {
				name: 'Ignore Cache',
				description: 'Ignores the cache directory.',
				option: '--ignoreCache',
				type: 'boolean',
				default: false
			},
			ignoreVendor: {
				name: 'Ignore Vendor',
				description: 'Ignores any _vendor directory.',
				option: '--ignoreVendor',
				type: 'boolean',
				default: false
			},
			log: {
				name: 'Log',
				description: 'Enable logging.',
				option: '--log',
				type: 'boolean',
				default: false
			},
			minify: {
				name: 'Minify',
				description: 'Minify any supported output format (HTML, XML, etc).',
				option: '--minify',
				type: 'boolean',
				default: false
			},
			noChmod: {
				name: 'No chmod',
				description: 'Prevent copying permission mode of files.',
				option: '--noChmod',
				type: 'boolean',
				default: false
			},
			noTimes: {
				name: 'No Times',
				description: 'Prevent copying modification time of files.',
				option: '--noTimes',
				type: 'boolean',
				default: false
			},
			pathWarnings: {
				name: 'Path Warnings',
				description: 'Print warnings on duplicate target paths, etc.',
				option: '--path-warnings',
				type: 'boolean',
				default: false
			},
			mem: {
				name: 'Print Memory',
				description: 'Print memory usage to screen at intervals.',
				option: '--print-mem',
				type: 'boolean',
				default: false
			},
			quiet: {
				name: 'Quiet',
				description: 'Reduce output during build.',
				option: '--quiet',
				type: 'boolean',
				default: false
			},
			templateMetrics: {
				name: 'Template Metrics',
				description: 'Display metrics about template executions.',
				option: '--templateMetrics',
				type: 'boolean',
				default: false
			},
			templateMetricsHints: {
				name: 'Template Metrics Hints',
				description: 'Calculate some improvement hints when combined with --templateMetrics.',
				option: '--templateMetricsHints',
				type: 'boolean',
				default: false
			},
			verbose: {
				name: 'Verbose',
				description: 'Verbose output.',
				option: '--verbose',
				alias: '-v',
				type: 'boolean',
				default: false
			},
			verboseLog: {
				name: 'Verbose Log',
				description: 'Verbose logging.',
				option: '--verboseLog',
				type: 'boolean',
				default: false
			}
		}
	},

	eleventy: {
		structure: 'cp <source> destination',
		source: 'source',
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
	},
};
