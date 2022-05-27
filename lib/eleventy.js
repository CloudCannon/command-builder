const { join, dirname } = require('path');
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

function getInstallCommands(buildConfig) {
	if (buildConfig.manage_plugin_manually) {
		return [
			'npm install'
		];
	}

	const configPath = buildConfig.config || '.eleventy.js';
	const configMovedPath = join(dirname(configPath), 'default-eleventy.config.js');
	const pluginTag = buildConfig.use_beta_plugin ? 'next' : 'latest';

	// npm pkg set requires npm version >= 7
	const installDependency = `npm pkg set dependencies.eleventy-plugin-cloudcannon=${pluginTag}`;
	const installDependencyFallback = `npm install eleventy-plugin-cloudcannon@${pluginTag}`;

	const commands = [
		// Add (fallback to install) the integration plugin as dependency
		`${installDependency} || ${installDependencyFallback}`,

		// Install dependencies
		'npm install',

		// Move the site config file to injected config require location
		`if [ -f ${configPath} ]; then mv ${configPath} ${configMovedPath}; fi`,

		// Move injected config to the original site config location
		`cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js ${configPath}`,

		// Set environment variable for plugin to read
		...(buildConfig.input ? [`export CC_ELEVENTY_INPUT="${buildConfig.input || ''}"`] : [])
	];

	return commands;
}

function getBuildCommands(buildConfig) {
	return [
		`npx @11ty/eleventy ${parseOptions('eleventy', buildConfig)}`
	];
}

module.exports = class Eleventy {
	static runScriptCommands(buildConfig = {}) {
		buildConfig.output = buildConfig.output || '_site';
		const outputPath = buildConfig.output.replace(/^\//, '');

		return [
			...Compiler.getPreinstallCommands(),
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
