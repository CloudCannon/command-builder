const Compiler = require('./compiler');
const { parseOptions } = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getVersioningCommands() {
	return [
		'export CC_ELEVENTY_VERSION=`npm list @11ty/eleventy | grep @11ty/eleventy | awk -F "@" \'{print $NF}\'`',
		'if [[ -z "$CC_ELEVENTY_VERSION" ]]; then export CC_ELEVENTY_VERSION=unknown; fi',

		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷@11ty/eleventy:${CC_ELEVENTY_VERSION}]"'
	];
}

function getInstallCommands(buildConfig) {
	if (buildConfig.manage_plugin_manually) {
		return [
			'npm install'
		].reduce(addEchoCommand, []);
	}

	const pluginTag = buildConfig.use_beta_plugin ? 'next' : 'latest';

	// npm pkg set requires npm version >= 7
	const installDependency = `npm pkg set dependencies.eleventy-plugin-cloudcannon=${pluginTag}`;
	const installDependencyFallback = `npm install eleventy-plugin-cloudcannon@${pluginTag}`;

	const installCommands = [
		// Add (fallback to install) the integration plugin as dependency
		`${installDependency} || ${installDependencyFallback}`,

		// Install dependencies
		'npm install'
	];

	const pluginCommands = [
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

		'PWD=`pwd`',
		'echo $PWD',

		'CONFIG_BASE=`basename $CONFIG`',
		'echo $CONFIG_BASE',

		'CONFIG_INJECTED="$PWD/$CONFIG_DIR/inject-cloudcannon.config.cjs"',
		'echo $CONFIG_INJECTED',

		'export CC_ELEVENTY_CONFIG="$PWD/$CONFIG_DIR/default-$CONFIG_BASE"',
		'echo $CC_ELEVENTY_CONFIG',

		// Move the site config file to injected config require location
		'if [ -f $CONFIG ]; then mv $CONFIG $CC_ELEVENTY_CONFIG; fi',

		// Move injected config to the original site config location
		'cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.cjs $CONFIG_INJECTED',

		// Set environment variable for plugin to read
		...(buildConfig.input ? [`export CC_ELEVENTY_INPUT="${buildConfig.input || ''}"`] : [])
	];

	return [
		...installCommands.reduce(addEchoCommand, []),
		...getVersioningCommands(),
		...pluginCommands.reduce(addEchoCommand, [])
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
			...Compiler.getPreinstallCommands(buildConfig),
			...getInstallCommands(buildConfig),
			...Compiler.getPrebuildCommands(),
			...Compiler.getCheckCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
