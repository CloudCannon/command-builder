const { join } = require('path');
const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

function getInjectRunCommands(buildConfig = {}) {
	const input = buildConfig.input || '.';
	const cloudcannonPath = join(input, 'cloudcannon');
	const defaultConfigPath = join(input, buildConfig.config || '.eleventy.js');
	const defaultConfigRenamedPath = join(input, 'default-eleventy.config.js');
	const injectedConfigPath = join(cloudcannonPath, 'inject-cloudcannon.config.js');

	delete buildConfig.config;
	const buildParams = Parser.parseOptions('eleventy', buildConfig);

	return [
		// Reinstall to force latest version
		'npm install eleventy-plugin-cloudcannon@latest',

		// Copy plugin templates and config
		`rm -rf ${cloudcannonPath}`,
		`cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ${input}`,

		// Move default config, then move inject config to the default location
		`[ ! -f ${defaultConfigPath} ] || mv ${defaultConfigPath} ${defaultConfigRenamedPath}`,
		`mv ${injectedConfigPath} ${defaultConfigPath}`,

		// Build
		`npx @11ty/eleventy ${buildParams}`
	];
}

function getRunCommands(buildConfig = {}) {
	const buildParams = Parser.parseOptions('eleventy', buildConfig);

	return [
		'npm install',
		`npx @11ty/eleventy ${buildParams}`
	];
}

module.exports = class Eleventy {
	static runScriptCommands(buildConfig) {
		const prebuildScript = Compiler.getPrebuildCommands();
		const outputState = Compiler.getOutputState();
		const runCommands = buildConfig.manage_plugin_manually
			? getRunCommands(buildConfig)
			: getInjectRunCommands(buildConfig);

		const commands = [
			'node -v',
			'npm -v',

			...runCommands,

			`rm -rf /usr/local/__site/${outputState}/`,
			`mkdir -p /usr/local/__site/${outputState}/`,
			`cp -R _site/* /usr/local/__site/${outputState}/`
		];

		return [
			prebuildScript,
			...commands.reduce((memo, command) => [...memo, `echo "$ ${command}"`, command], [])
		];
	}
};
