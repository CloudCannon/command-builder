const { join } = require('path');
const Compiler = require('./compiler');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'DETECTED_NPM_VERSION=$(npm -v | sed "s/[][]//g")',
		'DETECTED_NODE_VERSION=$(node -v | sed "s/[][]//g" | sed "s/^v//")',
		'DETECTED_DENO_VERSION=$(deno -V | sed "s/[][]//g" | sed "s/^deno //")',
		'DETECTED_YARN_VERSION=$(yarn -v)',
		'DETECTED_BUNDLE_VERSION=$(bundle -v | sed "s/[][]//g" | sed "s/^Bundler version //g")',
		'DETECTED_RUBY_VERSION=$(ruby -v | sed "s/[][]//g" | sed "s/^ruby //g" | cut -d " " -f 1)',

		/* eslint-disable no-template-curly-in-string */
		'echo "[🏷npm:${DETECTED_NPM_VERSION}]"',
		'echo "[🏷node:${DETECTED_NODE_VERSION}]"',
		'echo "[🏷deno:${DETECTED_DENO_VERSION}]"',
		'echo "[🏷yarn:${DETECTED_YARN_VERSION}]"',
		'echo "[🏷ruby-bundler:${DETECTED_BUNDLE_VERSION}]"',
		'echo "[🏷ruby:${DETECTED_RUBY_VERSION}]"'
		/* eslint-enable no-template-curly-in-string */
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
