const { join } = require('path');
const Compiler = require('./compiler');
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
	return buildConfig.install_command ? [buildConfig.install_command] : [];
}

function getBuildCommands(buildConfig, buildOutputPath) {
	const pluginTag = buildConfig.use_beta_plugin ? '@next' : '@latest';

	return [
		...(buildConfig.build_command ? [buildConfig.build_command] : []),
		`npx @cloudcannon/reader${pluginTag} --output "${buildOutputPath}"`
	];
}

module.exports = class Reader {
	static runScriptCommands(buildConfig = {}) {
		const buildOutputPath = join('.', buildConfig.output_path || 'public');

		return [
			...Compiler.getPreinstallCommands(),
			...getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPrebuildCommands(),
			...getCheckCommands(),
			...getBuildCommands(buildConfig, buildOutputPath).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(buildOutputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
