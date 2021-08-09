const { join } = require('path');
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
	const defaultConfigPath = join(input, buildConfig.config || '.eleventy.js');
	const defaultConfigMovedPath = join(input, 'default-eleventy.config.js');
	const injectedConfigPath = join(cloudcannonPath, 'inject-cloudcannon.config.js');

	return [
		// Creates a lock file (npm v6 not installing everything otherwise)
		'if [ ! -f package-lock.json ]; then npm install; fi',

		// Reinstall to force latest version (also installs dependencies in package-lock.json)
		'npm install eleventy-plugin-cloudcannon@latest',

		// Copy plugin templates and config
		`rm -rf ${cloudcannonPath}`,
		`cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ${input}`,

		// Move default config to injected config require location
		`if [ -f ${defaultConfigPath} ]; then mv ${defaultConfigPath} ${defaultConfigMovedPath}; fi`,

		// Move injected config to the default location
		`mv ${injectedConfigPath} ${defaultConfigPath}`
	];
}

function getBuildCommands(buildConfig) {
	const buildOptions = buildConfig.manage_plugin_manually
		? parseOptions('eleventy', buildConfig)
		: parseOptions('eleventy', { ...buildConfig, config: null });

	return [
		`npx @11ty/eleventy ${buildOptions}`
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
			...Compiler.getOutputCommands('_site/*'),
			...Compiler.getExportCommands()
		];
	}
};
