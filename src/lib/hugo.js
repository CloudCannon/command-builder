const { join } = require('path');
const Compiler = require('./compiler');
const Parser = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getBuildCommands(buildConfig) {
	let pluginTag;
	if (buildConfig.manage_plugin_manually) {
		pluginTag = '';
	} else if (buildConfig.use_beta_plugin) {
		pluginTag = '@next';
	} else {
		pluginTag = '@latest';
	}
	const buildOptions = Parser.parseOptions('hugo', buildConfig);

	return [
		`echo '$ hugo ${buildOptions}'`,
		`hugo ${buildOptions}`,
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		`echo '$ npx cloudcannon-hugo${pluginTag} ${buildOptions}'`,
		`npx cloudcannon-hugo${pluginTag} ${buildOptions}`,
		'nvm use "$__CURRENT_NVM_VERSION" > /dev/null',
		'unset __CURRENT_NVM_VERSION'
	];
}

function getInstallCommands(buildConfig) {
	return [
		'export NODE_PATH=`pwd`/node_modules:$NODE_PATH', // workaround for https://github.com/gohugoio/hugo/issues/9800
		...(buildConfig.install_command
			? [buildConfig.install_command, `cd ${Compiler.getInputPath()}`]
			: [])
	];
}

module.exports = class Hugo {
	static runScriptCommands(buildConfig = {}) {
		buildConfig.destination = buildConfig.destination || 'public';
		buildConfig.install_command = buildConfig.install_command ?? '[ -f package.json ] && npm i';
		const outputPath = join(
			buildConfig.source ?? '',
			buildConfig.destination
		).replace(/^\//, '');

		return [
			...Compiler.getPreinstallCommands(buildConfig),
			...getInstallCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...Compiler.getCheckCommands(),
			...getBuildCommands(buildConfig),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
