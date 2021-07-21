const Compiler = require('./compiler');
const Parser = require('../helpers/parser');
const { addEchoCommand } = require('../helpers/commands');

function getCheckCommands() {
	return [
		'hugo env'
	];
}

function getInstallCommands() {
	return [];
}

function getBuildCommands(buildConfig) {
	const buildOptions = Parser.parseOptions('hugo', buildConfig);

	return [
		`hugo ${buildOptions}`,
		`cloudcannon-hugo ${buildOptions}`
	];
}

function getOutputCommands(buildConfig) {
	const outputState = Compiler.getOutputState();
	const source = `${buildConfig.source || '/'}/public/*`
		.replace(/\/\//g, '/')
		.replace(/^\//, '');

	return [
		`rm -rf /usr/local/__site/${outputState}/`,
		`mkdir -p /usr/local/__site/${outputState}/`,
		`mv ${source} /usr/local/__site/${outputState}/` // TODO: change public to the publishDir
	];
}

module.exports = class Hugo {
	static runScriptCommands(buildConfig = {}) {
		return [
			...getCheckCommands().reduce(addEchoCommand, []),
			Compiler.getPreinstallCommands(),
			...getInstallCommands().reduce(addEchoCommand, []),
			Compiler.getLegacyPrebuildCommands(),
			Compiler.getPrebuildCommands(),
			...getBuildCommands(buildConfig).reduce(addEchoCommand, []),
			Compiler.getPostbuildCommands(),
			...getOutputCommands(buildConfig)
		];
	}
};
