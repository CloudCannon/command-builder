const { join } = require('path');
const Compiler = require('./compiler');
const Parser = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'hugo env'
	];
}

function getBuildCommands(buildConfig) {
	const buildOptions = Parser.parseOptions('hugo', buildConfig);

	return [
		`hugo ${buildOptions}`,
		`cloudcannon-hugo ${buildOptions}`
	];
}

module.exports = class Hugo {
	static runScriptCommands(buildConfig = {}) {
		// TODO: change public to the publishDir
		const outputPath = join(buildConfig.source || '', 'public/*').replace(/^\//, '');

		return [
			...getCheckCommands().reduce(addEchoCommand, []),
			...Compiler.getPreinstallCommands(),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			...Compiler.getPostbuildCommands(),
			...Compiler.getOutputCommands(outputPath),
			...Compiler.getExportCommands()
		];
	}
};
