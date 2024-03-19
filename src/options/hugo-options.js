module.exports = {
	structure: 'hugo [options]',
	defaults: {
		environment_variables: [
			{
				key: 'HUGO_CACHEDIR',
				value: '/usr/local/__site/src/.hugo_cache/'
			}
		],
		preserved_paths: 'node_modules/,.hugo_cache/,resources/'
	},
	options: {
		install_command: {
			name: 'Install Command',
			description: 'Command to install dependencies before build.',
			type: 'string',
			default: '[ -f package.json ] && npm i'
		},
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
		destination: {
			name: 'Destination',
			description: 'Path to write files to',
			option: '--destination',
			alias: '-d',
			type: 'string',
			validator: /.*/ig,
			default: 'public'
		},
		baseURL: {
			name: 'Base URL',
			description: 'Hostname and path to the root (e.g. https://example.com/).',
			option: '--baseURL',
			alias: '-b',
			type: 'string',
			validator: /.*/ig,
			suggestion: 'https://example.com',
			default: '/'
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
		logLevel: {
			name: 'Log level',
			description: '[Requires Hugo version >=0.114.0] Log level (debug|info|warn|error)',
			option: '--logLevel',
			suggestion: 'one of: debug, info, warn, error',
			type: 'string'
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
			description: '[Deprecated in Hugo version >=0.114.0] Output debug output.',
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
			description: '[Removed in Hugo version >=0.114.0] Enable logging.',
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
			default: true
		},
		printI18nWarnings: {
			name: 'Print I18n Warnings',
			description: 'Print missing translations.',
			option: '--printI18nWarnings',
			type: 'boolean',
			default: false
		},
		printMemoryUsage: {
			name: 'Print Memory',
			description: 'Print memory usage to screen at intervals.',
			option: '--printMemoryUsage',
			type: 'boolean',
			default: false
		},
		printPathWarnings: {
			name: 'Path Warnings',
			description: 'Print warnings on duplicate target paths, etc.',
			option: '--printPathWarnings',
			type: 'boolean',
			default: false
		},
		printUnusedTemplates: {
			name: 'Print Unused Templates',
			description: 'Print warnings on unused templates.',
			option: '--printUnusedTemplates',
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
			description: '[Deprecated in Hugo version >=0.114.0] Verbose output.',
			option: '--verbose',
			alias: '-v',
			type: 'boolean',
			default: false
		},
		verboseLog: {
			name: 'Verbose Log',
			description: '[Removed in Hugo version >=0.114.0] Verbose logging.',
			option: '--verboseLog',
			type: 'boolean',
			default: false
		},
		i18nWarnings: {
			name: 'I18n Warnings (Deprecated)',
			description: '[Deprecated in Hugo version >=0.93.0] Print missing translations.',
			option: '--i18n-warnings',
			type: 'boolean',
			default: false
		},
		pathWarnings: {
			name: 'Path Warnings (Deprecated)',
			description: '[Deprecated in Hugo version >=0.93.0] Print warnings on duplicate target paths, etc.',
			option: '--path-warnings',
			type: 'boolean',
			default: false
		},
		mem: {
			name: 'Print Memory (Deprecated)',
			description: '[Deprecated in Hugo version >=0.93.0] Print memory usage to screen at intervals.',
			option: '--print-mem',
			type: 'boolean',
			default: false
		}
	}
};
