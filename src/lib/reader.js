const { join } = require('path');
const Compiler = require('./compiler');
const { addEchoCommand } = require('../helpers/commands');

function getInstallCommands(buildConfig) {
	return buildConfig.install_command
		? [buildConfig.install_command, `cd ${Compiler.getInputPath()}`]
		: [];
}

function getBuildCommands(buildConfig, buildOutputPath) {
	let pluginTag;
	if (buildConfig.manage_plugin_manually) {
		pluginTag = '';
	} else if (buildConfig.use_beta_plugin) {
		pluginTag = '@next';
	} else {
		pluginTag = '@latest';
	}

	return [
		...(buildConfig.build_command
			? [
				`echo '$ ${buildConfig.build_command}'`,
				buildConfig.build_command,
				`echo '$ cd ${Compiler.getInputPath()}'`,
				`cd ${Compiler.getInputPath()}`
			]
			: []),
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		`echo '$ npx @cloudcannon/reader${pluginTag} --output "${buildOutputPath}"'`,
		`npx @cloudcannon/reader${pluginTag} --output "${buildOutputPath}"`,
		'nvm use "$__CURRENT_NVM_VERSION" > /dev/null',
		'unset __CURRENT_NVM_VERSION'
	];
}

module.exports = class Reader {
	static runScriptCommands(buildConfig = {}) {
		const buildOutputPath = join('.', buildConfig.output_path || 'public');

		return [
			...Compiler.getPreinstallCommands(buildConfig),
			...getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPrebuildCommands(),
			...Compiler.getCheckCommands(),
			...getBuildCommands(buildConfig, buildOutputPath),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(
				buildOutputPath,
				buildConfig.preserveOutput
			),
			...Compiler.getExportCommands()
		];
	}
};
