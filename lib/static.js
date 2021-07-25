const { join } = require('path');
const Compiler = require('./compiler');

module.exports = class Static {
	static runScriptCommands(buildConfig) {
		const source = buildConfig.source || '';
		const outputPath = join('/usr/local/__site', Compiler.getInputState(), source, '*');

		return [
			...Compiler.getPreinstallCommands(),
			...Compiler.getLegacyPrebuildCommands(),
			...Compiler.getPrebuildCommands(),
			...Compiler.getOutputCommands(outputPath),
			...Compiler.getPostbuildCommands(),
			...Compiler.getExportCommands()
		];
	}
};
