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
	const defaultConfigRenamedPath = join(input, 'default-eleventy.config.js');
	const injectedConfigPath = join(cloudcannonPath, 'inject-cloudcannon.config.js');

	return [
		// Reinstall to force latest version
		'npm install eleventy-plugin-cloudcannon@latest',

		// Copy plugin templates and config
		`rm -rf ${cloudcannonPath}`,
		`cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ${input}`,

		// Move default config to injected config require location
		`[ ! -f ${defaultConfigPath} ] || mv ${defaultConfigPath} ${defaultConfigRenamedPath}`,

		// Move injected config to the default location
		`mv ${injectedConfigPath} ${defaultConfigPath}`
	];
}

function getBuildCommands(buildConfig) {
	if (!buildConfig.manage_plugin_manually) {
		delete buildConfig.config;
	}

	const buildOptions = parseOptions('eleventy', buildConfig);

	return [
		`npx @11ty/eleventy ${buildOptions}`
	];
}

function getOutputCommands() {
	const outputState = Compiler.getOutputState();

	return [
		`rm -rf /usr/local/__site/${outputState}/`,
		`mkdir -p /usr/local/__site/${outputState}/`,
		`cp -R _site/* /usr/local/__site/${outputState}/` // TODO: change _site to output folder
	];
}

module.exports = class Eleventy {
	static runScriptCommands(buildConfig = {}) {
		return [
			getCheckCommands().reduce(addEchoCommand, []),
			Compiler.getPreinstallCommands(),
			getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			Compiler.getPrebuildCommands(),
			getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			Compiler.getPostbuildCommands(),
			getOutputCommands()
		];
	}
};
