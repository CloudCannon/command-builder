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
				type: 'boolean',
				default: false
			},
			config: {
				name: 'Configuration',
				description: '',
				option: '--config',
				type: 'string',
				validator: /.*/ig
			},
			future: {
				name: '',
				description: '',
				option: '--future',
				alias: '',
				type: 'boolean',
				default: false
			},
			lsi: {
				name: '',
				description: '',
				option: '--lsi',
				alias: '',
				type: 'boolean',
				default: false
			},
			trace: {
				name: '',
				description: '',
				option: '--trace',
				alias: '',
				type: 'boolean',
				default: false
			},
			verbose: {
				name: '',
				description: '',
				option: '--verbose',
				alias: '',
				type: 'boolean',
				default: false
			},
			quiet: {
				name: '',
				description: '',
				option: '--quiet',
				alias: '',
				type: 'boolean',
				default: false
			},
			profile: {
				name: '',
				description: '',
				option: '--profile',
				alias: '',
				type: 'boolean',
				default: false
			}
		}
	},

	hugo: {
		structure: 'hugo [options]',
		options: {
			environment: {
				name: '',
				description: '',
				option: '--environment',
				type: 'boolean',
				default: false
			},
			source: {
				name: '',
				description: '',
				option: '--source',
				type: 'boolean',
				default: false
			},

			baseURL: {
				name: '',
				description: '',
				option: '--baseURL',
				type: 'boolean',
				default: false
			},
			config: {
				name: '',
				description: '',
				option: '--config',
				type: 'boolean',
				default: false
			},
			configDir: {
				name: '',
				description: '',
				option: '--configDir',
				type: 'boolean',
				default: false
			},
			contentDir: {
				name: '',
				description: '',
				option: '--contentDir',
				type: 'boolean',
				default: false
			},
			layoutDir: {
				name: '',
				description: '',
				option: '--layoutDir',
				type: 'boolean',
				default: false
			},
			themesDir: {
				name: '',
				description: '',
				option: '--themesDir',
				type: 'boolean',
				default: false
			},
			theme: {
				name: '',
				description: '',
				option: '--theme',
				type: 'boolean',
				default: false
			},
			logFile: {
				name: '',
				description: '',
				option: '--logFile',
				type: 'boolean',
				default: false
			},
			ignoreVendorPaths: {
				name: '',
				description: '',
				option: '--ignoreVendorPaths',
				type: 'boolean',
				default: false
			},
			disableKinds: {
				name: '',
				description: '',
				option: '--disableKinds',
				type: 'boolean',
				default: false
			},
			buildDrafts: {
				name: '',
				description: '',
				option: '--buildDrafts',
				type: 'boolean',
				default: false
			},
			buildExpired: {
				name: '',
				description: '',
				option: '--buildExpired',
				type: 'boolean',
				default: false
			},
			buildFuture: {
				name: '',
				description: '',
				option: '--buildFuture',
				type: 'boolean',
				default: false
			},
			cleanDestinationDir: {
				name: '',
				description: '',
				option: '--cleanDestinationDir',
				type: 'boolean',
				default: false
			},
			debug: {
				name: '',
				description: '',
				option: '--debug',
				type: 'boolean',
				default: false
			},
			enableGitInfo: {
				name: '',
				description: '',
				option: '--enableGitInfo',
				type: 'boolean',
				default: false
			},
			gc: {
				name: '',
				description: '',
				option: '--gc',
				type: 'boolean',
				default: false
			},
			i18nWarnings: {
				name: '',
				description: '',
				option: '--i18n-warnings',
				type: 'boolean',
				default: false
			},
			ignoreCache: {
				name: '',
				description: '',
				option: '--ignoreCache',
				type: 'boolean',
				default: false
			},
			ignoreVendor: {
				name: '',
				description: '',
				option: '--ignoreVendor',
				type: 'boolean',
				default: false
			},
			log: {
				name: '',
				description: '',
				option: '--log',
				type: 'boolean',
				default: false
			},
			minify: {
				name: '',
				description: '',
				option: '--minify',
				type: 'boolean',
				default: false
			},
			noChmod: {
				name: '',
				description: '',
				option: '--noChmod',
				type: 'boolean',
				default: false
			},
			noTimes: {
				name: '',
				description: '',
				option: '--noTimes',
				type: 'boolean',
				default: false
			},
			pathWarnings: {
				name: '',
				description: '',
				option: '--path-warnings',
				type: 'boolean',
				default: false
			},
			mem: {
				name: '',
				description: '',
				option: '--print-mem',
				type: 'boolean',
				default: false
			},
			quiet: {
				name: '',
				description: '',
				option: '--quiet',
				type: 'boolean',
				default: false
			},
			templateMetrics: {
				name: '',
				description: '',
				option: '--templateMetrics',
				type: 'boolean',
				default: false
			},
			templateMetricsHints: {
				name: '',
				description: '',
				option: '--templateMetricsHints',
				type: 'boolean',
				default: false
			},
			verbose: {
				name: '',
				description: '',
				option: '--verbose',
				type: 'boolean',
				default: false
			},
			verboseLog: {
				name: '',
				description: '',
				option: '--verboseLog',
				type: 'boolean',
				default: false
			}
		}
	}
};
