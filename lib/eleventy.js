const path = require('path');
const Compiler = require('./compiler');
const Parser = require('../helpers/parser');

function getInjectRunCommands(buildConfig = {}) {
	delete buildConfig.config;

	const buildParams = Parser.parseOptions('eleventy', buildConfig);
	const input = buildConfig.input || '.';
	const cloudcannonPath = path.join(input, 'cloudcannon');
	const defaultConfigPath = path.join(input, '.eleventy.js');
	const defaultConfigRenamedPath = path.join(input, 'default-eleventy.config.js');
	const injectedConfigPath = path.join(cloudcannonPath, 'inject-cloudcannon.config.js');

	return [
		// Reinstall to force latest version
		`npm install eleventy-plugin-cloudcannon@latest`,

		// Copy plugin templates and config
		`rm -rf ${cloudcannonPath}`,
		`cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon ${input}`,

		// Move default config, otherwise 11ty reads it regardless of custom --config value
		`touch ${defaultConfigPath}`,
		`mv ${defaultConfigPath} ${defaultConfigRenamedPath}`,

		// Build with config that wraps default config
		`npx @11ty/eleventy --config=${injectedConfigPath} ${buildParams}`
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
		const runCommands = buildConfig.injectCloudCannon
			? getInjectRunCommands(buildConfig)
			: getRunCommands(buildConfig);

		const commands = [
			'node -v',
			'npm -v',

			'npm config set registry https://registry.npmjs.org/',
			'npm config set cache-lock-stale 10',
			'npm config set cache-lock-wait 10',

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
