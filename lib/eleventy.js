const { join, dirname } = require('path');
const Compiler = require('./compiler');
const { parseOptions } = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'node -v',
		'npm -v'
	];
}

function getInstallCommands(buildConfig) {
	if (buildConfig.manage_plugin_manually) {
		return [
			'npm install'
		];
	}

	const input = buildConfig.input || '.';
	const cloudcannonPath = join(input, 'cloudcannon');
	const configPath = buildConfig.config || '.eleventy.js';
	const configMovedPath = join(dirname(configPath), 'default-eleventy.config.js');
	const pluginTag = buildConfig.use_beta_plugin ? '@next' : '@latest';

	const latestInjectCommands = [
		// Copy plugin templates and config
		`rm -rf ${cloudcannonPath}`,
		`cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ${input}`,

		// Move injected config to the set or default location
		`cp node_modules/eleventy-plugin-cloudcannon/cloudcannon/inject-cloudcannon.config.js ${configPath}`
	];

	const nextInjectCommands = [
		// Move injected config to the set or default location
		`cp node_modules/eleventy-plugin-cloudcannon/src/inject-cloudcannon.config.js ${configPath}`
	];

	const commands = [
		// Creates a lock file (npm v6 not installing everything otherwise)
		'if [ ! -f package-lock.json ] && [ -f package.json ]; then npm install; fi',

		// Reinstall to force latest version (also installs dependencies in package-lock.json)
		`npm install eleventy-plugin-cloudcannon${pluginTag}`,

		// Move default config to injected config require location
		`if [ -f ${configPath} ]; then mv ${configPath} ${configMovedPath}; fi`,

		...(buildConfig.use_beta_plugin ? nextInjectCommands : latestInjectCommands),

		// Set environment variable for plugin to read
		`export CC_ELEVENTY_INPUT="${buildConfig.input || ''}"`
	];

	return commands;
}

function getBuildCommands(buildConfig) {
	return [
		`npx @11ty/eleventy --output=_site ${parseOptions('eleventy', buildConfig)}`
	];
}

module.exports = class Eleventy {
	static runScriptCommands(buildConfig = {}) {
		return [
			...getCheckCommands().reduce(addEchoCommand, []),
			...Compiler.getPreinstallCommands(),
			...getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPrebuildCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands('_site'),
			...Compiler.getExportCommands()
		];
	}
};
