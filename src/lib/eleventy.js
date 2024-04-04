const Compiler = require('./compiler');
const { parseOptions } = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'DETECTED_NPM_VERSION=$(npm -v | sed \'s/[][]//g\')',
		'DETECTED_NODE_VERSION=$(node -v | sed \'s/[][]//g\' | sed \'s/^v//\')',

		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"'
	];
}

function getVersioningCommands() {
	return [
		'export CC_ELEVENTY_VERSION=`npm list @11ty/eleventy | grep @11ty/eleventy | awk -F "@" \'{print $NF}\'`',

		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷@11ty/eleventy:${CC_ELEVENTY_VERSION}]"'
	];
}

function getInstallCommands(buildConfig) {
	if (buildConfig.manage_plugin_manually) {
		return [
			'npm install'
		];
	}

	const pluginTag = buildConfig.use_beta_plugin ? 'next' : 'latest';

	// npm pkg set requires npm version >= 7
	const installDependency = `npm pkg set dependencies.eleventy-plugin-cloudcannon=${pluginTag}`;
	const installDependencyFallback = `npm install eleventy-plugin-cloudcannon@${pluginTag}`;

	return [
		// Add (fallback to install) the integration plugin as dependency
		`${installDependency} || ${installDependencyFallback}`,

		// Install dependencies
		'npm install',

		...(
			buildConfig.config
				? [
					`if [ -f "${buildConfig.config}" ]; then CONFIG="${buildConfig.config}"; fi`
				]
				: [
					// Find default config path (in reverse order to match priority)
					'if [ -f eleventy.config.cjs ]; then CONFIG=eleventy.config.cjs; fi',
					'if [ -f eleventy.config.mjs ]; then CONFIG=eleventy.config.mjs; fi',
					'if [ -f eleventy.config.js ]; then CONFIG=eleventy.config.js; fi',
					'if [ -f .eleventy.js ]; then CONFIG=.eleventy.js; fi'
				]
		),

		'echo $CONFIG',

		'CONFIG_DIR=`dirname $CONFIG`',
		'echo $CONFIG_DIR',

		'CONFIG_BASE=`basename $CONFIG`',
		'echo $CONFIG_BASE',

		'CONFIG_INJECTED="$CONFIG_DIR/inject-cloudcannon.config.cjs"',
		'echo $CONFIG_INJECTED',

		'export CC_ELEVENTY_CONFIG="$CONFIG_DIR/default-$CONFIG_BASE"',
		'echo $CC_ELEVENTY_CONFIG',

		// Move the site config file to injected config require location
		'if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi',

		// Move injected config to the original site config location
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED',

		// Set environment variable for plugin to read
		...(buildConfig.input ? [`export CC_ELEVENTY_INPUT="${buildConfig.input || ''}"`] : [])
	];
}

function getBuildCommands(buildConfig) {
	const alteredConfig = {
		...buildConfig,
		config: undefined
	};

	return [
		`npx @11ty/eleventy --config=$CONFIG_INJECTED ${parseOptions('eleventy', alteredConfig)}`
	];
}

module.exports = class Eleventy {
	static runScriptCommands(buildConfig = {}) {
		buildConfig.output = buildConfig.output || '_site';
		const outputPath = buildConfig.output.replace(/^\//, '');

		return [
			...Compiler.getPreinstallCommands(),
			...getVersioningCommands(),
			...getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPrebuildCommands(),
			...getCheckCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
