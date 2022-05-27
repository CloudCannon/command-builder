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
		`hugo ${buildOptions}`,
		`npx cloudcannon-hugo${tag} ${buildOptions}`
	];
}

module.exports = class Hugo {
	static runScriptCommands(buildConfig = {}) {
		buildConfig.destination = buildConfig.destination || 'public';
		const outputPath = join(buildConfig.source ?? '', buildConfig.destination).replace(/^\//, '');

		return [
			...Compiler.getPreinstallCommands(),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...getCheckCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath, buildConfig.preserveOutput),
			...Compiler.getExportCommands()
		];
	}
};
