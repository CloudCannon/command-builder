const Compiler = require('./compiler');

module.exports = class Hugo {
	static runScriptCommands(buildConfig) {
		const prebuildScript = Compiler.getPrebuildCommands();
		const outputState = Compiler.getOutputState();
		const buildParams = Hugo.getBuildParams(buildConfig).join(' ');

		return [
			prebuildScript,

			'echo "$ hugo env"',
			'hugo env',

			`echo "$ hugo ${buildParams}"`,
			`hugo ${buildParams}`, // TODO flags + config

			'echo "$ cloudcannon-hugo"',
			`cloudcannon-hugo ${buildParams}`,

			`echo "$ rm -rf /usr/local/__site/${outputState}/"`,
			`rm -rf /usr/local/__site/${outputState}/`,

			`echo "$ mkdir -p /usr/local/__site/${outputState}/"`,
			`mkdir -p /usr/local/__site/${outputState}/`,

			`echo "$ mv public/* /usr/local/__site/${outputState}/"`, // Todo change public/ to the publishDir
			`mv public/* /usr/local/__site/${outputState}/`
		];
	}

	static getBuildParams(buildConfig) {
		const buildParams = [];

		if (buildConfig.environment) {
			buildParams.push('--environment', buildConfig.environment);
		}

		if (buildConfig.source) {
			buildParams.push('--source', buildConfig.source);
		}

		if (buildConfig.baseURL) {
			buildParams.push('--baseURL', buildConfig.baseURL);
		}

		if (buildConfig.config) {
			buildParams.push('--config', buildConfig.config);
		}

		if (buildConfig.configDir) {
			buildParams.push('--configDir', buildConfig.configDir);
		}

		if (buildConfig.contentDir) {
			buildParams.push('--contentDir', buildConfig.contentDir);
		}

		if (buildConfig.layoutDir) {
			buildParams.push('--layoutDir', buildConfig.layoutDir);
		}

		if (buildConfig.themesDir) {
			buildParams.push('--themesDir', buildConfig.themesDir);
		}

		if (buildConfig.theme) {
			buildParams.push('--theme', buildConfig.theme);
		}

		if (buildConfig.logFile) {
			buildParams.push('--logFile', buildConfig.logFile);
		}

		if (buildConfig.ignoreVendorPaths) {
			buildParams.push('--ignoreVendorPaths', buildConfig.ignoreVendorPaths);
		}

		if (buildConfig.disableKinds) {
			buildParams.push('--disableKinds', buildConfig.disableKinds);
		}

		if (buildConfig.buildDrafts) {
			buildParams.push('--buildDrafts');
		}

		if (buildConfig.buildExpired) {
			buildParams.push('--buildExpired');
		}

		if (buildConfig.buildFuture) {
			buildParams.push('--buildFuture');
		}

		if (buildConfig.cleanDestinationDir) {
			buildParams.push('--cleanDestinationDir');
		}

		if (buildConfig.debug) {
			buildParams.push('--debug');
		}

		if (buildConfig.enableGitInfo) {
			buildParams.push('--enableGitInfo');
		}

		if (buildConfig.gc) {
			buildParams.push('--gc');
		}

		if (buildConfig.warnings) {
			buildParams.push('--i18n-warnings');
		}

		if (buildConfig.ignoreCache) {
			buildParams.push('--ignoreCache');
		}

		if (buildConfig.ignoreVendor) {
			buildParams.push('--ignoreVendor');
		}

		if (buildConfig.log) {
			buildParams.push('--log');
		}

		if (buildConfig.minify) {
			buildParams.push('--minify');
		}

		if (buildConfig.noChmod) {
			buildParams.push('--noChmod');
		}

		if (buildConfig.noTimes) {
			buildParams.push('--noTimes');
		}

		if (buildConfig.warnings) {
			buildParams.push('--path-warnings');
		}

		if (buildConfig.mem) {
			buildParams.push('--print-mem');
		}

		if (buildConfig.quiet) {
			buildParams.push('--quiet');
		}

		if (buildConfig.templateMetrics) {
			buildParams.push('--templateMetrics');
		}

		if (buildConfig.templateMetricsHints) {
			buildParams.push('--templateMetricsHints');
		}

		if (buildConfig.verbose) {
			buildParams.push('--verbose');
		}

		if (buildConfig.verboseLog) {
			buildParams.push('--verboseLog');
		}

		return buildParams;
	}
};
