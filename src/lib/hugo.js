const { join } = require('path');
const Compiler = require('./compiler');
const Parser = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'DETECTED_HUGO_VERSION=$(hugo version | sed \'s/[][]//g\' | sed \'s/^hugo v//\' | cut -d \' \' -f 1)',

		// eslint-disable-next-line no-template-curly-in-string
		'echo "[🏷hugo:${DETECTED_HUGO_VERSION}]"'
	];
}

function getBuildCommands(buildConfig) {
	const tag = buildConfig.use_beta_plugin ? '@next' : '';
	const buildOptions = Parser.parseOptions('hugo', buildConfig);

	return [
		`echo '$ hugo ${buildOptions}'`,
		`hugo ${buildOptions}`,
		'__CURRENT_NVM_VERSION=$(nvm current)',
		'nvm use default > /dev/null',
		`echo '$ npx cloudcannon-hugo${tag} ${buildOptions}'`,
		`npx cloudcannon-hugo${tag} ${buildOptions}`,
		'nvm use "$__CURRENT_NVM_VERSION" > /dev/null',
		'unset __CURRENT_NVM_VERSION'
	];
}

function getInstallCommands() {
	return [
		'export NODE_PATH=`pwd`/node_modules:$NODE_PATH', // workaround for https://github.com/gohugoio/hugo/issues/9800
		'if [ -f package.json ]; then npm i; fi'
	];
}

module.exports = class Hugo {
	static runScriptCommands(buildConfig = {}) {
		buildConfig.destination = buildConfig.destination || 'public';
		const outputPath = join(buildConfig.source ?? '', buildConfig.destination).replace(/^\//, '');

		return [
			...Compiler.getPreinstallCommands(),
			...getInstallCommands().reduce(addEchoCommand, []),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...getCheckCommands(),
			...getBuildCommands(buildConfig),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
